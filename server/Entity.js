const { pick, first, invert, mapKeys, keys, values, map } = require('lodash');
const NodeCache = require( 'node-cache' );
const { promisify } = require('util');
const md5 = require('md5');

const getLogger = (prefix) =>
    Object.keys(console).reduce((memo, key) => ({...memo, [key]: (...args) => console[key](prefix, ...args)}), {});

const defaultCacheTTL = 3600; // one hour;
const cacher = new NodeCache({stdTTL: defaultCacheTTL} );

function Entity (Base, { table: tableName, mappings, cacheTTL }) {
    const Table = Base(tableName);

    const localToReal = mappings;
    const realToLocal = invert(mappings);

    function toLocal (record) {
        const realFields = values(mappings);
        const fields = mapKeys(pick(record.fields, realFields), (val, key) => realToLocal[key]);
        return { id: record.id, ...fields };
    }

    function toReal (entity) {
        const localFields = keys(mappings);
        return mapKeys(pick(entity, localFields), (val, key) => localToReal[key]);
    }

    async function update (id, changes) {
        const updatedRecord = await Table.update(id, toReal(changes)).then(toLocal);
        await invalidate();
        all();
        return updatedRecord;
    }

    async function find (id) {
        if (!id) return null;

        const user = await Table.find(id);
        return toLocal(user);
    }

    async function destroy (id) {
        if (!id) return null;
        return Table.destroy(id);
    }

    function findBy (localKey, value) {
        return new Promise((resolve, reject) => {
            const realKey = localToReal[localKey];

            const config = {
                maxRecords: 1,
                filterByFormula: `{${realKey}} = '${value}'`,
            };

            const page = (records, fetchNextPage) => {
                const record = first(records);
                resolve(record ? toLocal(record) : null);
                fetchNextPage();
            };

            const done = (err) => {
                if (err) return reject(err);
            };

            Table.select(config).eachPage(page, done);
        });
    }

    function search(fields, value, nocache) {
        const conf = {
            maxRecords: Infinity,
        };
        if (value) {
            conf.filterByFormula = `OR(${fields.map(f => `SEARCH('${value}',{${localToReal[f]}})`).join(',')})`;
        }
        return getData(conf, nocache);
    }

    function filter (localKey, condition = '=', value) {
        return getData({
            maxRecords: Infinity,
            filterByFormula: `{${localToReal[localKey]}} ${condition} '${value}'`,
        });
    }

    function all () {
        return getData({ maxRecords: Infinity });
    }

    async function create(eventId, userData) {
      const payload = toReal({
        eventId: [eventId],
        userId: userData.sub,
        userData: JSON.stringify(userData),
        isAgreed: true,
      });
      await invalidate();
      all();
      return Table.create(payload).then(d => toLocal(d._rawJson));
    }

    function getCacheKey(config) {
        return md5(JSON.stringify({tableName, ...config}));
    }

    async function invalidate () {
        // Temporary solution, until we figure out a proper way to invalidate only what's changed.
        const allKey = getCacheKey({ maxRecords: Infinity });

        try {
            await promisify(cacher.del)(allKey);
            console.log(allKey, 'cache invalidated');
        } catch (err) {
            console.log(allKey, 'cache invalidation error', err);
        }
    }

    function getData(config, nocache) {
        const cacheKey = getCacheKey(config);
        const Logger = getLogger(cacheKey);

        return new Promise((resolve, reject) => {

            cacher.get(cacheKey, (err, value) => {
                if (nocache) {
                    err = 'cache manually disabled with nocache=true';
                }
                if (process.env.CACHE_ENABLED === 'false') {
                    err = 'cache manually disabled with CACHE_ENABLED env variable';
                }
                if (!err && !!value) {
                    Logger.log('cache hit');
                    return resolve(value);
                }
                Logger.log('cache miss');

                if (err) {
                    Logger.error('cache error', err);
                }
                if (!value) {
                    Logger.error('empty cache value');
                }

                const results = [];
                const page = (records, fetchNextPage) => {
                    results.push(...records);
                    fetchNextPage();
                };

                const done = (err) => {
                    if (err) {
                        Logger.error('airtable error' ,err);
                        return reject(err);
                    }
                    const res = map(results, toLocal);
                    resolve(res);

                    if (!res.length) {
                        Logger.log('not caching empty results');
                        return;
                    }

                    const ttl = cacheTTL || defaultCacheTTL;
                    Logger.log(`caching ${res.length} results for ${ttl} seconds`);

                    cacher.set(cacheKey, res, ttl, (err, success) => {
                        if (err) {
                            Logger.error('cache set error', err);
                        }
                        if (success) {
                            Logger.log('cache set success');
                        }
                    });
                };

                Table.select(config).eachPage(page, done);
            });
        });
    }

    return { update, find, findBy, all, filter, search, invalidate, create, destroy };
}




module.exports = Entity;