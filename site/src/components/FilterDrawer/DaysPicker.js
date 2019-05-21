import { map } from 'lodash';
import React, { Fragment } from 'react';
import Radio from '@material-ui/core/Radio';
import { getDays } from './localState';

export default function DaysPicker ({ state, dispatch, ...props }) {
  const days = getDays(state);

  return (
    <Fragment>
      {map(days, ({ name, value, selected }) => (
        <label key={value} className="FilterDrawer-fieldGroup">
          <Radio
            checked={selected}
            onChange={() => {
              dispatch({ type: 'TOGGLE_DAY', value })
            }}
          />
          <span>{name}</span>
        </label>
      ))}
    </Fragment>
  );
}