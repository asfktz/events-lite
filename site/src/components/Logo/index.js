import './style.scss';

import React from 'react';
import { ReactComponent as LogoImage } from '../../assets/logo.svg';
import useBreakpoints from '../../utils/useBreakpoints';

export default function Logo(argument) {
  const largerThen = useBreakpoints();

  return (
    <div className="Logo">
      <LogoImage className="Logo-image" />

      <span className="Logo-label" style={{ display: 'flex' }}>
        {largerThen.md && <span className="Logo-label-a">התכנייה</span>}

        <span className="Logo-label-b">
              פסטיבל שייח' אבריק ה-3 לתרבות אזרחית
          {' '}
          <br />
              קרית טבעון, 10-13 באפריל 2019
        </span>
      </span>
    </div>
  );
}
