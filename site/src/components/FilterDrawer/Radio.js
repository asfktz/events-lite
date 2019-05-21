import './Radio.scss';

import React from 'react';

export default function Radio({ ...props }) {
  return (
    <span className="Radio">
      <input type="radio" {...props} className="Radio-input check-custom" />
      <span className="Radio-mask"></span>
    </span>
  );
}
