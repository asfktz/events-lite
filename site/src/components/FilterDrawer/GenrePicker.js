import { map, every } from 'lodash';
import React, { Fragment } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { getDays, isSelected } from './localState';

import { genres } from '../../CONSTANTS';

export default function GenrePicker ({ state, dispatch, ...props }) {
  return (
    <Fragment>
      {map(genres, ({ label, value }) => {
        return (
          <label key={value} className="FilterDrawer-fieldGroup">
            <span>
              <Checkbox
                checked={isSelected(state, 'order', value)}
                onChange={() => {
                  dispatch({ type: 'SELECT_ORDER', value })
                }}
              />
            </span>
            <span>{label}</span>
          </label>
        );
      })}
    </Fragment>
  );
}