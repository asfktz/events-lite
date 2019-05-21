import _ from 'lodash';

export default function mapKeyValue (iterable, key, value) {
  return _.mapValues(_.mapKeys(iterable, key), value);
}