import invert from 'lodash/invert';
import keyBy from 'lodash/keyBy';

export const filters = {
  term: {
    type: 'string',
    label: 'חיפוש חיפושי',
    default: ''
  },

  groupBy: {
    type: 'string',
    label: 'סדר לפי',
    default: 'days'
  },

  camps: {
    type: 'multi',
    label: 'מחנה',
    default: []
  },

  days: {
    type: 'multi',
    label: 'ימים',
    default: []
  },

  zones: {
    type: 'multi',
    label: 'אזור',
    default: []
  },

  genres: {
    type: 'multi',
    label: 'ז\'אנר',
    default: []
  },

  isChildrenFriendly: {
    type: 'boolean',
    label: 'מתאים לילדים',
    default: false
  },

  futureOnly: {
    type: 'boolean',
    label: 'רק אירועים עתידיים',
    default: false
  },

  favsOnly: {
    type: 'boolean',
    label: 'רק אירועים שאהבתי',
    default: false
  },

  isRegistrationRequired: {
    type: 'boolean',
    label: 'בהרשמה מראש',
    default: false
  }
};

export const breakpoints = {
  sm: 500,
  md: 768,
  lg: 1024,
  xlg: 1300,
};

export const zones = {
  center: {
    label: 'מרכז',
    value: 'center',
    color: 'rgb(163, 117, 179)',
  },
  north: {
    label: 'צפון',
    value: 'north',
    color: 'rgb(105, 184, 127)',
  },
  south: {
    label: 'דרום',
    value: 'south',
    color: 'rgb(250, 169, 72)',
  },
  west: {
    label: 'מערב',
    value: 'west',
    color: 'rgb(100, 169, 213)',
  },
  everywhere: {
    label: 'בכל מקום',
    value: 'everywhere',
    color: '#e02020',
  },
};

export const genres = keyBy([
  { value: 'art', label: 'אמנות', color: '#CFDFFF' },
  { value: 'lecture', label: 'הרצאה', color: '#D0F0FD' },
  { value: 'therapy', label: 'טיפול', color: '#C2F5E9' },
  { value: 'music', label: 'מוזיקה', color: '#FEE2D5' },
  { value: 'dance', label: 'מחול', color: '#D1F7C4' },
  { value: 'party', label: 'מסיבה', color: '#FFEAB6' },
  { value: 'workshop', label: 'סדנה', color: '#FFDCE5' },
  { value: 'performance', label: 'פרפורמנס', color: '#FFDAF6' },
  { value: 'cinema', label: 'קולנוע', color: '#EDE2FE' },
  { value: 'food', label: 'אוכל', color: '#9CC7FF' },
  { value: 'camp', label: 'מקום', color: '#76D1F3' },
  { value: 'other', label: 'אחר', color: '#EEEEEE' },
], 'value');


export const groupBy = keyBy([
  { label: 'לו"ז', value: 'days' },
  { label: "ז'אנרים", value: 'genres' },
  { label: 'אזורים', value: 'zones' }
], 'value')

export const days = keyBy([
  { value: '3', label: 'רביעי' },
  { value: '4', label: 'חמישי' },
  { value: '5', label: 'שישי' },
  { value: '6', label: 'שבת' },
], 'value');