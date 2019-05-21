import './style.scss';
import React from 'react';

import { ReactComponent as WazeIcon } from '../../assets/waze-maps.svg';
import { ReactComponent as MapsIcon } from '../../assets/google-maps.svg';
import get from 'lodash/get';

export default function Navigate ({ location }) {
  if (!get(location, 'lat') || !get(location, 'lng')) return null;

  return (
    <div className="Navigate">
          <span>ניווט: </span>
          <div className="Navigate-btns">
              <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`} className="Navigate-btn">
                  <MapsIcon className="GoogleMap-icon" />
              </a>
              <a target="_blank" href={`https://waze.com/ul?ll=${location.lat},${location.lng}&z=10`} className="Navigate-btn">
                  <WazeIcon className="WazeMap-icon" />
              </a>
          </div>
    </div>
  );
}