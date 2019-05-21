import { map } from 'lodash';

export default function mapTo (keys, collection) {
  return map(keys, (key) => collection[key])
}