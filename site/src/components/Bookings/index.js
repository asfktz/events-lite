import './style.scss';

import React, { useContext } from 'react';

import _ from 'lodash';

import { formatAddress } from '../../utils/formatters';
import { toHumanTime } from '../../utils/timeUtils';
import { ReactComponent as AlertIcon } from '../../assets/alert-circle.svg';

import { dateRange } from '../../utils/timeUtils';
import { getStatus } from '../../utils/bookingsUtils';
import context from '../../context';
import cx from 'classnames';

import Navigate from '../Navigate';


function Booking ({ booking, status }) {
    const { data } = useContext(context);
    const [startDate, endDate] = dateRange(booking.day, booking.startTime, booking.duration);
    const location = data.locations[booking.location];

    return (
        <div className={cx('Bookings-row', `Bookings-row--${status}`)}>
            {/*<div className="Bookings-count">1</div>*/}
            <div className="Bookings-main">
                <div>{toHumanTime(startDate, endDate)}</div>
                {status !== 'canceled' && location && (
                  <div>
                      {formatAddress(location)}
                      <Navigate location={location}  />
                  </div>
                )}
            </div>
        </div>
    );
}

function getBookingsStatus (bookings) {
    const isCanceled = _.every(bookings, { isCanceled: true });

    if (isCanceled) {
        return 'canceled';
    }

    const hasChanges = _.some(bookings, (booking) => getStatus(booking) !== 'same');

    if (hasChanges) {
        return 'changed';
    }

    return 'same';
}

const statusInfo = {
    canceled: {
        iconStyle: { stroke: '#B33A3A' },
        label: 'האירוע בוטל' 
    },
    changed: {
        iconStyle: { stroke: 'rgb(255, 153, 0)' },
        label: 'שימו לב לשינוי בפרטי האירוע'
    }
};

export default function Bookings ({ bookings, ...props }) {
    const status = getBookingsStatus(bookings);
    
    return (
        <div {...props} className="Bookings">
            {_.map(bookings, (booking, i) => { 
                return (
                    <Booking key={i} booking={booking} status={getStatus(booking)} />
                );
            })}

            <div>
                {status !== 'same' && (
                  <div className="Bookings-changesAlert">
                        <AlertIcon
                            className="Bookings-changesAlert-icon"
                            style={statusInfo[status].iconStyle}
                        />
                        <span>{statusInfo[status].label}</span>
                  </div>
                )}
            </div>
        </div>
    );
}