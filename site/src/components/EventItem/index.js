import './style.scss';

import React, { useContext } from 'react';
import context from '../../context';

import TruncateMarkup from 'react-truncate-markup';
import { Link } from 'react-router-dom';
import Image from '../Image';
import _ from 'lodash';

import { dateRange, toHumanTime } from '../../utils/timeUtils';
import { zones } from '../../CONSTANTS';
import { formatAddress } from '../../utils/formatters';
import mapTo from '../../utils/mapTo';
import { get } from 'lodash';
import FavBtn from '../FavBtn';
import useBreakpoints from '../../utils/useBreakpoints';
import * as eventUtils from '../../utils/eventUtils'

import Zone from '../Zone';
import cx from 'classnames'; 
import GenreTag from '../GenreTag';

export default function EventItem({ event, booking, zone, to: pathname, campId, ...props }) {
  const largerThen = useBreakpoints();
  const imageRatio = largerThen.md ? (1 / 2) : (1 / 1);

  const { data } = useContext(context);
  const [startDate, endDate] = dateRange(booking.day, booking.startTime, booking.duration);
  const timeText = toHumanTime(startDate, endDate);
  const location = data.locations[booking.location];
  const camps = mapTo(campId ? [campId] : event.camps, data.camps);
  
  const to = {
    pathname: pathname,
    state: { hasHistory: true }
  }

  const isCanceled = eventUtils.isCanceled(event);

  return (
    <div {...props} className={cx({
      'EventItem2': true,
      'EventItem2--canceled': isCanceled
    })}>
      <div className="EventItem2-in">
        <Link to={to} className="EventItem2-image">
          <Image
            style={{ width: '100%', height: '100%' }}
            ratio={imageRatio}
            src={event.coverImageSM || '/placeholder-logo.png'}
            color="#FFF"
          />
        </Link>
        <div className="EventItem2-main">
          <div className="EventItem2-header">
            <Link to={to} className="EventItem2-heading">
              <div className="EventItem2-title">{event.name}</div>
              <GenreTag className="EventItem2-genre" genre={event.genre} />
            </Link>
            {!(isCanceled || largerThen.md) && (
              <FavBtn eventId={event.id} bookingId={booking.id} />
            )}
          </div>
          {location && (
            <div className="EventItem2-location">
              {get(location, 'zone') && <Zone className="EventItem2-zone" zone={location.zone} location={location} />}
              <span>{formatAddress(location)}</span>
            </div>
          )}
          <div className="EventItem2-time">
            <span>{timeText}</span>
          </div>
          <div className="EventItem2-address">
            <span className="EventItem2-camp">{_.join(_.map(camps, 'name'), ', ')}</span>
            {/*camps.map((camp) => (
              <span key={camp.id} className="EventItem2-camp">{camp.name}</span>
            ))*/}
          </div>
          {/*<div className="EventItem2-description">
            <TruncateMarkup lines={2}>
              <div>{event.description}</div>
            </TruncateMarkup>
          </div>*/}
          <Link to={to} className="EventItem2-more">קראו עוד</Link>
        </div>
      </div>
    </div>
  );
}
