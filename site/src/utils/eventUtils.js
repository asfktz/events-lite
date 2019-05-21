import { every } from 'lodash';

export function isCanceled (event) {
  return every(event.bookings, { isCanceled: true });
}

