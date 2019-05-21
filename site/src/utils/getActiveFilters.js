import _ from 'lodash';
import * as CONSTANTS from '../CONSTANTS';

export default function getActiveFilters (query, opts = { excludeTerm: false }) {
  return (
    _.omitBy(query, (value, key) => {
      if (!_.keys(CONSTANTS.filters).includes(key)) return true;
      if (opts.excludeTerm && key === 'term') return true;
      return CONSTANTS.filters[key].default === value;
    })
  );
}