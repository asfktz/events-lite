import { stringify, parse } from 'query-string';
import { reduce, mapValues, isBoolean } from 'lodash';

const options = { arrayFormat: 'bracket'};

export default {
	stringify: obj => {
		const search = reduce(obj, (search, val, key) => {
			search[key] = val;

			if (isBoolean(val)) {
				search[key] = val ? true : undefined;
			}

			return search;
		}, {});

		return stringify(search, options)
	},
	parse: str => {
		const search = parse(str, options);
		return mapValues(search, (val) => {
			return val === 'true' ? true : val;
		});
	}
}