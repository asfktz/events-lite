import _ from 'lodash';
import { days as DAYS } from '../CONSTANTS';
import mapKeyValue from './mapKeyValue';

// const dayNumByName = mapKeyValue(DAYS, 'label', 'value');
const dayNameByNum = mapKeyValue(DAYS, 'value', 'label');

export default function groupByDay(events, data) {
  const bookings = _.flatMap(events, 'bookings');
  const byDay = _(bookings)
    .groupBy('dayNum')
    .mapValues((bookings, day) => {
      return _(bookings)
        .orderBy('startTime')
        .map((booking) => ({
          day,
          booking,
          event: data.events[booking.event],
        }))
        .value();
    })
    .value();

  const days = _.keys(byDay).map((dayNum) => ({ num: dayNum, name: dayNameByNum[dayNum] }));

  return { byDay, days };
}