import { format, getDay, addSeconds } from 'date-fns';

import dateFns from 'date-fns';
global.dateFns = dateFns;

const dayNameByNumber = {
	0: 'ראשון',
	1: 'שני',
	2: 'שלישי',
	3: 'רביעי',
	4: 'חמישי',
	5: 'שישי',
	6: 'שבת'
};

const dateByDay = {
    'רביעי': new Date(2019, 3, 10),
    'חמישי': new Date(2019, 3, 11),
    'שישי': new Date(2019, 3, 12),
    'שבת': new Date(2019, 3, 13),
};

export function getDayNumWithOffset (date) {
    const offset = dateFns.getHours(date) < 4 ?  - 1 : 0;
    return getDay(date) + offset;
}

export function getDayName (date) {
    const offset = dateFns.getHours(date) < 4 ?  - 1 : 0;
    const datNum = getDay(date) + offset;
	return dayNameByNumber[datNum];
}

export function asHour (date) {
    return format(date, 'H:mm');
}

export function asDuration (duration) {
    const hours = duration / 60 / 60;

    if (hours === 2) {
        return 'שעתיים';
    }

    if (hours === 1) {
        return 'שעה';
    }

    if (hours < 1) {
        return `${duration / 60} דקות`;
    }

    // if (hours > 5) {
    //     return 'כל היום'
    // }

    return `${duration / 60 / 60} שעות`;
}

export function toHumanTime (startTime, endTime) {
	// const duration = (endTime - startTime) / 1000;
    return `${getDayName(startTime)}, ${asHour(startTime)} עד ${asHour(endTime)}`; 
}

export function toDate (day, seconds) {
  return addSeconds(dateByDay[day], seconds);
}

export function dateRange (day, startTime, duration) {
  const start = toDate(day, startTime);
  const end = toDate(day, startTime + duration);
  return [start, end];
}
