import React from 'react';
import { useContext, createContext, useMemo } from 'react';
import useLocalstorage from 'react-use-localstorage';
import _ from 'lodash';


const ctx = createContext();

function buildKey (eventId, bookingId) {
  return eventId + '//' + bookingId;
}

function parseKey (key) {
  const [eventId, bookingId] = key.split('//');
  return { eventId, bookingId };
}

export function FavoritesProvider ({ children }) {
  const [raw, setFavs] = useLocalstorage('favorites');
  const state = useMemo(() => JSON.parse(raw || '{}'), [raw]);

  const value = {
    state,

    getList () {
      return _(state)
        .keys()
        .map(parseKey)
        .value();
    },

    isActive (eventId, bookingId) {
      const key = buildKey(eventId, bookingId);
      
      if (state[key]) {
        return true;
      }

      return state[key];
    },
    toggle (eventId, bookingId) {
      const key = buildKey(eventId, bookingId);
      const nextFavs = state[key]
        ? _.omit(state, key)
        : { ...state, [key]: true };
      
      setFavs(JSON.stringify(nextFavs));
    }
  };

  return (
    <ctx.Provider value={value}>
      {children}
    </ctx.Provider>
  )
}

export function useFavorites () {
  return useContext(ctx);
}