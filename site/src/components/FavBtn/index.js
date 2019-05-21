import './style.scss';

import React from 'react';
import { ReactComponent as HeartIcon } from '../../assets/heart.svg';
import { useFavorites } from '../../favorites';
import cx from 'classnames';

export default function FavBtn ({ eventId, bookingId }) {
  const favs = useFavorites();

  return (
    <HeartIcon
      onClick={(e) => {
        e.stopPropagation();
        favs.toggle(eventId, bookingId);
      }}
      className={cx({
        "EventItem2-heart": true,
        'EventItem2-heart--active': favs.isActive(eventId, bookingId)
      })}
    />
  );
}