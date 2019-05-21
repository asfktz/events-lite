import './Checkbox.scss';

import React from 'react';
import { ReactComponent as CheckboxIcon } from '../../assets/check.svg';
import isNil from 'lodash/isNil';

export default function Checkbox({ value, ...props }) {
  const checked = isNil(props.checked) ? Boolean(value) : props.checked;

  return (
    <span className="Checkbox">
      <input type="checkbox" {...props} checked={checked} className="Checkbox-input check-custom" />
      <span className="Checkbox-mask">
        <CheckboxIcon className="Checkbox-v" style={{ opacity: checked ? 1 : 0 }} />
      </span>
    </span>
  );
}
