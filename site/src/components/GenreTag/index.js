import './style.scss';

import React from 'react';
import { genres } from '../../CONSTANTS';
import cx from 'classnames';

export default function GenreTag ({ genre, className, ...props }) {
  const { color, label } = genres[genre] || {};

  return (
    <span
      className={cx("GenreTag", className)}
      style={{ backgroundColor: color }}
      {...props}>
      {label}
    </span>
  );
}