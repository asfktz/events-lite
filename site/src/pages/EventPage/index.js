/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import './style.scss';

import React, { Fragment, useContext, useLayoutEffect } from 'react';
import { get } from 'lodash';

import Card from '../../components/Card';
import Image from '../../components/Image';
import Bookings from '../../components/Bookings';
import context from '../../context';
import Content from '../../components/Content';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { ReactComponent as ChildIcon } from '../../assets/smile.svg';
import { ReactComponent as ArrowIcon } from '../../assets/arrow-right.svg';

export default function EventPage({ match, history, location, auth }) {
  const hasHistory = get(location, 'state.hasHistory', false);
  const { data } = useContext(context);

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  const event = data.events[match.params.eventId];

  function handleBack () {
    if (hasHistory) {
      history.go(-1);
    } else {
      history.push('/events')
    }
  }

  return (
    <div className="EventPage container">
      <div className="EventPage-topbar">
        <div className="EventPage-btn-back" onClick={handleBack}>
          <ArrowIcon className="EventPage-btn-icon" />
          <span className="EventPage-btn-back-label">בחזרה לחיפוש</span>
        </div>

        <div className="EventPage-btn-share" />
      </div>

      <Card>
        <Image
          ratio={1 / 2}
          src={event.coverImageLG || event.coverImageOrig}
          placeholderSrc={event.coverImageSM}
          color="#f3f3f3"
        />

        <div className="EventPage-main">
          <div className="EventPage-header">
            <h1 className="EventPage-name">{event.name}</h1>
          </div>
          <div className="EventPage-in">
            <div className="EventPage-content">
              <div className="EventPage-description">
                <Content content={event.digitalDescription} />
              </div>

              <div className="EventPage-creators">
                <h3 className="EventPage-creators-header">
                  <span>מאת:</span>
                  {' '}
                  {event.creatorName}
                </h3>
                <div />
                <Content content={event.creatorAbout} />
              </div>
            </div>
            <div className="EventPage-side">
              <h3 className="EventPage-creators-header">מתי ואיפה?</h3>

              <Bookings className="EventPage-bookings" bookings={event.bookings} />

              <div>
                {event.isChildrenFriendly && (
                <div className="EventPage-attribute">
                  <ChildIcon className="EventPage-attribute-icon" style={{ color: '#82af17' }} />
                  <span>מתאים לילדים</span>
                </div>
                )}
              </div>

              <div>
                <div className="EventPage-camps">
                  <div className="EventPage-camps-title">מחנה:</div>
                  <div className="EventPage-camps-content">
                    {_.map(event.camps, (campId, i) => (
                      <Fragment key={campId}>
                        {!!i && ', '}
                        <Link to={`/camps/${campId}`} className="EventPage-camp">
                          {data.camps[campId].name}
                        </Link>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
