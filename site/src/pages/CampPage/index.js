import './style.scss';

import React, { useMemo, useContext, useLayoutEffect } from 'react';

import _ from 'lodash';
import Image from '../../components/Image';
import context from '../../context';
import qs from '../../utils/qs';

import { NavTabs, NavTab } from '../../components/NavTabs';

import Zone from '../../components/Zone';

import Content from '../../components/Content';
import EventItem from '../../components/EventItem';
import { Redirect } from 'react-router-dom';

import groupByDay from '../../utils/groupByDay';
import Navigate from '../../components/Navigate';

export default function CampPage({ match, history, location }) {
  const query = qs.parse(location.search);

  const { data } = useContext(context);

  useLayoutEffect(() => {
    document.getElementById('root').scrollTop = 0;
  }, []);

  const camp = data.camps[match.params.campId];
  const { byDay, days } = useMemo(() => {
    const events = _.compact(_.map(camp.events, id => data.events[id]));
    return groupByDay(events, data);
  }, [camp, data]);


  if (days.length && (!query.day || !byDay[query.day])) {
    return (
      <Redirect to={`${location.pathname}?day=${days[0].num}`} />
    );
  }

  return (
    <div className="CampPage container">
      {/* <div className="CampPage-topbar">
        <div className="CampPage-btn-back" onClick={() => (hasHistory ? history.go(-1) : history.push('/camps'))}>
          <ArrowIcon className="CampPage-btn-icon" />
          <span className="CampPage-btn-back-label">בחזרה לחיפוש</span>
        </div>
      </div> */}
      <div className="CampPage-main">
        <div className="CampPage-about">
          <Image
            className="CampPage-image"
            ratio={1 / 2}
            src={camp.coverImageLG || camp.coverImageOrig}
            placeholderSrc={camp.coverImageSM}
            color="#f3f3f3"
          />
          <div className="CampPage-content">
            <h1 className="CampPage-typetag">מחנה</h1>
            <h1 className="CampPage-name">{camp.name}</h1>
            <div className="CampPage-location">
              <span className="CampPage-address">{camp.address}</span>
              <Zone zone={camp.zone} />
            </div>
            <div className="CampPage-description">
              <Content content={camp.description} />
            </div>
            <div>
              <Navigate location={{ lat: camp.lat, lng: camp.lng }} />
            </div>
          </div>
        </div>
        <div className="CampPage-events">
          <NavTabs className="CampPage-tabs" history={history} match={match} location={location}>
            {_.map(days, ({ num, name }) => (
              <NavTab key={num} color="#a375b3" className="CampPage-tab" to={`${location.pathname}?day=${num}`}>{name}</NavTab>
            ))}
          </NavTabs>
          <div className="CampPage-eventList">
            {_.map(byDay[query.day], ({ event, booking }) => (
              <div key={booking.id} className="CampPage-eventItem">
                <EventItem event={event} booking={booking} campId={camp.id} to={`/events/${event.id}/${booking.id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
