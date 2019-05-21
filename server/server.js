console.clear();
require('dotenv').config();

const Hapi = require('hapi');
const Boom = require('boom');

const _ = require('lodash');
const CONSTANTS = require('./CONSTANTS');
const Airtable = require('airtable');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const util = require('util');

const size = require('lodash/size');
const filter = require('lodash/filter');
const flatMap = require('lodash/flatMap');
const compact = require('lodash/compact');
const union = require('lodash/union');
const forEach = require('lodash/forEach');

const async = require('awaity');

const { validateJWT } = require('./auth');
const Entity = require('./Entity');

const writeFile = util.promisify(fs.writeFile);

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
});

const Base = airtable.base(process.env.AIRTABLE_BASE_ID);

const Creators = new Entity(Base, {
  table: CONSTANTS.creators.table,
  mappings: CONSTANTS.creators.mappings,
  cacheTTL: 60 * 60 * 24 // 1 day
});

const Camps = new Entity(Base, {
  table: CONSTANTS.camps.table,
  mappings: CONSTANTS.camps.mappings,
  cacheTTL: 60 * 60 * 24 // 24 hours
});

const Locations = new Entity(Base, {
  table: CONSTANTS.locations.table,
  mappings: CONSTANTS.locations.mappings,
  cacheTTL: 60 * 60 * 24 // 24 hours
});

const Bookings = new Entity(Base, {
  table: CONSTANTS.bookings.table,
  mappings: CONSTANTS.bookings.mappings,
  cacheTTL: 60 * 60 * 24 // 24 hours
});

const Events = new Entity(Base, {
  table: CONSTANTS.events.table,
  mappings: CONSTANTS.events.mappings,
  cacheTTL: 60 * 60 * 24 // 24 hours
});

const Registrations = new Entity(Base, {
  table: CONSTANTS.registrations.table,
  mappings: CONSTANTS.registrations.mappings,
  cacheTTL: 60 * 60 * 24 // 24 hours
});

const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
});

async function withBookings (event) {
  const bookings = await Promise.resolve(event.bookings || [])
    .then((bookingIds) => {
      return async.map(bookingIds, Bookings.find);
    })
    .then((bookings) => {
      return async.map(bookings, async (booking) => {
        const location = await Locations.find(booking.location);
        return { ...booking, location };
      });
    });

  return { ...event, bookings };
}

async function init () {
    await server.register(require('inert'));
    await server.register(require('hapi-auth-basic'));
    await server.register(require('hapi-auth-jwt2'));
    await server.register(require('vision'));
    await server.register(require('spazy'));


    server.auth.strategy('jwt', 'jwt', {
        key: process.env.SECRET,
        verifyOptions: { algorithms: [ 'HS256' ] },
        validate: validateJWT({
          findUser: (id) => Creators.find(id)
        }),
      });

    server.views({
        engines: { html: require('nunjucks-hapi') },
        isCached: false,
        relativeTo: __dirname,
        path: 'templates'
    });

    server.route({
      method: 'PATCH',
      path: '/api/events/{eventId}',
      options: { auth: 'jwt' },
      handler: async (request) => {
        const { eventId } = request.params;
        const values = _.pick(request.payload, [
          'digitalDescription',
          'creatorName',
          'creatorAbout',
          'genre',
        ]);

        try {
          const event = await Events.update(eventId, values);

          if (!event) {
            return Boom.notFound('Event not found');
          }

          return withBookings(event);
        } catch (err) {
          return err;
        }
      }
    });

    server.route({
        method: 'post',
        path: '/api/auth',
        handler: async function (request) {
          const { email, password } = request.payload;
          const user = await Creators.findBy('email', email);

          if (!user) {
            return Boom.unauthorized('user not found');
          }

          if (user.phone !== password) {
            return Boom.unauthorized('invalid password');
          }

          const token = jwt.sign({ id: user.id }, process.env.SECRET);
          return { token };
        }
    });

    server.route({
        method: 'get',
        path: '/api/creator-data',
        options: { auth: 'jwt' },
        handler: async function (request) {
          let creator = await Creators.find(request.auth.credentials.id)
            .then((creator) => ({
              ...creator,
              events: creator.events || [],
              camps: creator.camps || []
            }));

          const camps = await async.map(creator.camps, Camps.find);

          const eventIds = compact(union(creator.events, flatMap(camps, 'events')));

          const events = await Promise.resolve()
            .then(() => async.map(eventIds, Events.find))
            .then((events) => async.map(events, withBookings));

          const eventById = _.keyBy(events, 'id');

          const hasBookings = (eventId) => size(eventById[eventId].bookings);

          creator.events = filter(creator.events, hasBookings);

          const registrationIds = _.compact(_.flatMap(events, 'registrations'));
          const registrationsRaw = (await async.map(registrationIds || [], Registrations.find))
            .filter(one =>  one.isDeleted !== true);

          const users = _(registrationsRaw)
            .keyBy('userId')
            .mapValues(({ userData }) => JSON.parse(userData))
            .value();

          const registrations = _(registrationsRaw)
            .map(({ id, userId, eventId }) => ({ id, userId, eventId: _.first(eventId) }))
            .value();

          forEach(camps, (camp) => {
            camp.events = filter(camp.events, hasBookings);
          });

          return { creator, events, camps, users, registrations };
        }
    });


    server.route({
        method: 'get',
        path: '/api/sync-cache',
        handler: async function () {
          const results =  await async.props({
              events: Events.all(),
              creators: Creators.all(),
              camps: Camps.all(),
              bookings: Bookings.all(),
              locations: Locations.all()
          });

          return writeFile('./cache.json', JSON.stringify(results))
            .then(() => 'OK');
        }
    });

    server.route({
      method: 'get',
      path: '/api/v1/events',
      async handler (req) {
        const fields = ['creatorAbout', 'name', 'printDescription', 'digitalDescription'];
        const events = await Events.search(fields, req.query.search, req.query.nocache);
        return _(events)
          .filter((event) => _.size(event.bookings))
          .map((event) => {
            return {
              ...event,
              coverImageSM: event.coverImageSM,
              coverImageLG: event.coverImageLG,
            };
          })
          .value();
      }
    });

    function clearUser(o) {
      return _.omit(o, 'userData');
    }

    server.route({
      method: 'get',
      path: '/api/v1/registrations',
      async handler () {
        const all = await Registrations.all();
        return all.filter(one =>  one.isDeleted !== true).map(clearUser);
      }
    });

    server.route({
      method: 'post',
      path: '/api/v1/registrations',
      async handler (request) {
        const {eventId, user} = request.payload;
        return Registrations.create(eventId, user);
      }
    });

    server.route({
      method: 'get',
      path: '/api/v1/registrations/{id}',
      async handler (request) {
        return Registrations.all().then(data => data.find(d => d.id === request.params.id));
      }
    });

    server.route({
      method: 'put',
      path: '/api/v1/registrations/{id}',
      async handler (request) {
        return Registrations.update(request.params.id, request.payload);
      }
    });

    server.route({
      method: 'delete',
      path: '/api/v1/registrations/{id}',
      async handler (request) {
        await Registrations.destroy(request.params.id);
        return '';
      }
    });



    server.route({
      method: 'get',
      path: '/api/v1/creators',
      async handler () {
        return Creators.all();
      }
    });

    server.route({
      method: 'get',
      path: '/api/v1/camps',
      async handler () {
        const camps = await Camps.all();
        return _.map(camps, (camp) => {
          return {
            ...camp,
            coverImageSM:  camp.coverImageSM,
            coverImageLG: camp.coverImageLG,
          };
        });
      }
    });


    server.route({
      method: 'get',
      path: '/api/v1/bookings',
      async handler () {
        return Bookings.all();
      }
    });

    server.route({
      method: 'get',
      path: '/api/v1/locations',
      async handler () {
        return Locations.all();
      }
    });


    server.route({
      method: 'get',
      path: '/api/v1/invalidate',
      async handler () {
        await Promise.all([
            Events.invalidate(),
            Creators.invalidate(),
            Camps.invalidate(),
            Bookings.invalidate(),
            Locations.invalidate(),
            Registrations.invalidate(),
        ]);

        Promise.all([
          Events.all(),
          Creators.all(),
          Camps.all(),
          Bookings.all(),
          Locations.all(),
          Registrations.all(),
        ]);

        return 'OK';
      }
    });

    server.route({
        method: 'get',
        path: '/images/{path*}',
        async handler (request, h) {
          return h.file(`public/images/${request.params.path}`);
        },
        options: {
            cache: {
                expiresIn: 9999999999,
                privacy: 'public'
            }
        }
    });

    server.route({
        method: 'get',
        path: '/{rest*}',
        async handler (req, res) {
          return res.spazy(req.url, {
            folder: path.resolve('../admin/build')
          });
        }
    });


    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    
    await Promise.all([
      Events.all(),
      Creators.all(),
      Camps.all(),
      Bookings.all(),
      Locations.all(),
      Registrations.all(),
    ]);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();