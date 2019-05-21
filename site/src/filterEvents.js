import arrify from 'arrify';
import _ from 'lodash';
import { toDate } from './utils/timeUtils';

export default function filterEvents(events, query, data, favs) {
  return _(events)
    .filter(({ genre }) => (_.size(query.genres) ? arrify(query.genres).includes(genre) : true))
    .filter((event) => {
      if (query.isChildrenFriendly) {
        return event.isChildrenFriendly;
      }

      return true;
    })
    .flatMap((event) => {
      return _.map(event.bookings, (booking) => {
        return {
          ...event,
          booking,
          location: data.locations[booking.location]
        };
      });
    })
    .thru((events) => {
      const metchTerm = (value = '') => (
        value.toLowerCase().trim().includes(query.term.toLowerCase().trim())
      );

      const directResults = events.filter(({ name = '', creatorName }) => {
        return _.some([name, creatorName], metchTerm);
      })

      const otherResults =  events.filter(({ location, camps: campIds }) => {
        const campNames = _.map(campIds, (campId) => data.camps[campId].name);
        return _.some([location.name, location.address, ...campNames], metchTerm);
      });

      return _.union(directResults, otherResults);
    })
    .filter((event) => {
      if (!_.size(query.days)) {
        return event;
      }

      return query.days.includes(event.booking.dayNum);
    })
    .filter((event) => {
      if (!_.size(query.zones)) {
        return event;
      }

      return query.zones.includes(event.location.zone);
    })
    .filter((event) => {
      if (!query.isChildrenFriendly) {
        return event;
      }

      return event.isChildrenFriendly;
    })
    .filter((event) => {
      if (!query.isRegistrationRequired) {
        return event;
      }

      return event.isRegistrationRequired;
    })
    .filter((event) => {
      if (!query.futureOnly) {
        return true;
      }

      return Number(event.booking.startDate) > Date.now();
    })
    .filter((event) => {
      if (!query.favsOnly) {
        return true;
      }

      return favs.isActive(event.id, event.booking.id);
    })
    .orderBy([
      event => event.name !== 'טקס הפתיחה',
      event => event.name === 'טקס הסיום',
      event => {
        if (event.name === 'Breakfast on the Moon' ) return 0;
        return event.genre === 'food';
      },
      (event) => {
        const { day, startTime } = event.booking;
        return toDate(day, startTime);
      },
    ])
    .value();
}