import './style.scss';

import React from 'react';

import TruncateMarkup from 'react-truncate-markup';
import { Link } from 'react-router-dom';
import Image from '../Image';

import useBreakpoints from '../../utils/useBreakpoints';

import Zone from '../Zone';

import Navigate from '../Navigate';

export default function CampItem({
  camp, zone, to, ...props
}) {
  const largerThen = useBreakpoints();

  const imageRatio = largerThen.md ? (1 / 2) : (1 / 1);

  return (
    <div {...props} className="CampItem">
      <div className="CampItem-in">
        <Link to={to} className="CampItem-image">
          <Image
            style={{ width: '100%', height: '100%' }}
            ratio={imageRatio}
            src={camp.coverImageSM || '/placeholder-logo.png'}
            color="#FFF"
          />
        </Link>
        <div className="CampItem-main">
          <Link to={to} className="CampItem-title">{camp.name}</Link>
          <div className="CampItem-location">
            <span className="CampItem-address">{camp.address}</span>
            <Zone className="CampItem-zone" zone={camp.zone} />
          </div>
          <div className="CampItem-description">
            <TruncateMarkup lines={2}>
              <div>{camp.description}</div>
            </TruncateMarkup>
          </div>
          <Link to={to} className="CampItem-more">קראו עוד</Link>
        </div>
      </div>
    </div>
  );
}
