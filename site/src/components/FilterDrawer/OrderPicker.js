import { map, every } from 'lodash';
import React, { Fragment } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import { getDays, isSelected } from './localState';

const orderOptions = [
  { name: 'הלו\'ז', value: 'schedule' },
  { name: 'ז\'אנר', value: 'genre' },
];

export default function OrderPicker ({ state, dispatch, ...props }) {
  return (
    <Fragment>
      {map(orderOptions, ({ name, value }) => {
        return (
          <label key={value} className="FilterDrawer-fieldGroup">
            <Radio
              checked={isSelected(state, 'order', value)}
              onChange={() => {
                dispatch({ type: 'SELECT_ORDER', value })
              }}
            />
            <span>{name}</span>
          </label>
        );
      })}
    </Fragment>
  );
}