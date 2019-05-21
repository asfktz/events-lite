import './style.scss';

import React, { useState } from 'react';
import Ratio from '../Ratio';
import cx from 'classnames';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export default function Image({ ratio, color, src, alt = '', className, ...props }) {
  return (
    <Ratio ratio={ratio} className={cx('Image', className)} style={{ backgroundColor: color }}>
      <LazyLoadImage
        {...props}
        src={src}
        effect="opacity"
        alt={alt}
        className="Image-img"
        style={{ width: '100%' }}
      />
    </Ratio>
  );
}
