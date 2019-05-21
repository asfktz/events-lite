import _ from 'lodash';
import * as CONSTANTS from '../../CONSTANTS';

export const initialState = {
  pickerType: null,
  days: {
    4: true,
    6: true
  },
  genres: {},
  camps: {},
  order: 'schedule'
}

export function reducer (state, action) {
  switch (action.type) {
    case 'OPEN_PICKER':
      return {
        ...state,
        pickerType: action.pickerType
      };

    case 'SELECT_ORDER':
      return {
        ...state,
        order: action.value
      };

    case 'TOGGLE_ALLDAY':
      return {
        ...state,
        day: null
      };

    case 'TOGGLE_DAY':
      return {
        ...state,
        day: action.value
      };

    default:
      return state;
  }
}

export function getDays  (state) {
  const allDays = {
    value: null,
    name: 'כל הימים',
    selected: Boolean(state.day === null)
  };

  const days = _.map(CONSTANTS.days, (name, num) => ({
    value: num,
    name: name,
    selected: Boolean(state.day === num)
  }));

  return [allDays, ...days];
}

export function getSelectedDays  (state) {
  return _.filter(getDays(state), { selected: true });
}

export function isSelected (state, type, value) {
  if (type === 'order') {
    return state.order === value
  }
}