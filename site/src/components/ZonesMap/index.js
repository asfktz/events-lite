import React from 'react';
import './style.scss';

// import baseImg from './base.png';
// import { ReactComponent as Areas } from './areas.svg';
// import { ReactComponent as Labels } from './labels.svg';

import src from './zones-map.jpg';

export default function ZonesMap() {
  return (
    <div className="ZonesMap">
      <img src={src} alt=""/>
      {/*<img className="ZonesMap-base" src={baseImg} alt=""/>
      <Areas className="ZonesMap-areas" />
      <Labels className="ZonesMap-labels" />*/}
    </div>
  );
}