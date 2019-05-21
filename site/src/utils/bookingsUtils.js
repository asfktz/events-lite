import _ from 'lodash';

export function getStatus (booking) {
  if (booking.isCanceled) {
    return 'canceled';
  }

  const digital = {
      day: booking.day,
      startTime: booking.startTime,
      location: booking.location,
      duration: booking.duration,
  };

  const print = {
      day: booking.dayPrint,
      startTime: booking.startTimePrint,
      location: booking.locationPrint,
      duration: booking.durationPrint
  };

  if (booking.startTimePrint === undefined) {
    return 'added';
  }

  if (!_.isEqual(digital, print)) {
    return 'changed';
  }

  return 'same';
}