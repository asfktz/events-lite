/* eslint-disable no-underscore-dangle */

import axios from 'axios';
import { keyBy, map, mapValues, memoize } from 'lodash';
import * as CONSTANTS from './CONSTANTS';
import mapKeyValue from './utils/mapKeyValue';

import { getDayNumWithOffset, toDate } from './utils/timeUtils';

const dayNumByName = mapKeyValue(CONSTANTS.days, 'label', 'value');

const keyById = res => keyBy(res.data, 'id');
const mapByKey = collection => key => collection[key];

async function _getData() {
  return Promise
    .all([
      axios.get('/api/v1/events').then(keyById),
      axios.get('/api/v1/creators').then(keyById),
      axios.get('/api/v1/locations').then(keyById),
      axios.get('/api/v1/bookings').then(keyById),
      axios.get('/api/v1/registrations').then(keyById),
      axios.get('/api/v1/camps').then(keyById),
    ])
    .then(([rawEvents, creators, locations, bookings, registrations, camps]) => {
      bookings = mapValues(bookings, (booking) => {
        const startDate = toDate(booking.day, booking.startTime);

        return {
          ...booking,
          startDate: startDate,
          dayNum: String(getDayNumWithOffset(toDate(booking.day, booking.startTime))),
          locationRef: locations[booking.location]
        }
      });

      return {
        creators,
        bookings,
        locations,
        registrations,
        camps,
        events: mapValues(rawEvents, (event) => {
          const numPeople = +event.numPeople;
          return {
            ...event,
            numPeople: !isNaN(numPeople) ? numPeople : Infinity,
            creators: map(event.creators, mapByKey(creators)),
            bookings: map(event.bookings, mapByKey(bookings)),
            coverImage: event.coverImage || '/placeholder-logo.png',
            coverImageSM: event.coverImageSM || '/placeholder-logo.png',
            coverImageLG: event.coverImageLG || '/placeholder-logo.png',
          };
        }),
      }
    });
}

export const getData = memoize(_getData);


export async function registerEvent(event, user) {
  return axios.post('/api/v1/registrations', { eventId: event.id, user });
}

export async function unRegisterEvent(id) {
  return axios.delete(`/api/v1/registrations/${id}`);
}

export async function getEvent(eventId) {
  return getData().then(({ events }) => events[eventId]);
}
