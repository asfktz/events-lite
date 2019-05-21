import './style.scss';

import React from 'react';

import { zones } from '../../CONSTANTS';
import cx from 'classnames';

export default function Zone({ zone, className, ...props }) {
  const { color: zoneColor, label: zoneLabel } = zones[zone];
  
  return (
    <span>
      <span className={cx("Zone", className)}>
        <span className="Zone-point" style={{ backgroundColor: zoneColor }} />
        <span className="Zone-label" style={{ color: zoneColor }}>{zoneLabel}</span>
      </span>
    </span>
  );
}
