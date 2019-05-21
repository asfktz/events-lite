import React, { useState, Fragment } from 'react';

import { NavLink } from 'react-router-dom';
import MobileMenu from '../../MobileMenu';

import Logo from '../Logo';
import useBreakpoints from '../../utils/useBreakpoints';

export default function Header() {
  const [isMenuVisibile, setMenuVisibility] = useState(false);

  const mq = useBreakpoints();

  const internalLinks = (
    <Fragment>
      <NavLink className="Menu-link" to="/events">אירועים</NavLink>
      <NavLink className="Menu-link" to="/camps">מחנות</NavLink>
      <NavLink className="Menu-link" to="/favorites">אירועים שאהבתי</NavLink>
    </Fragment>
  );

  const externalLinks = (
    <Fragment>
      <a className="Menu-link" target="_blank" href="http://www.abreik.org/%d7%aa%d7%9e%d7%99%d7%9b%d7%94/">תמיכה בפסטיבל</a>
      <a className="Menu-link" target="_blank" href="http://www.abreik.org/%D7%94%D7%9E%D7%A9%D7%97%D7%A7">המשחק</a>
      <a className="Menu-link" target="_blank" href="https://docs.google.com/document/d/1loEsxKBFIL_uFgEXKJXO0uHL_bFIOrDfu-Upaf10qLY/mobilebasic">English</a>
      <a className="Menu-link" href="http://www.abreik.org/">בחזרה לאתר</a>
    </Fragment>
  );

  return (
    <header className="EventListPage-header">
      <div className="EventListPage-header-in">
        <div className="EventListPage-header-topbar">
          <Logo />

          {mq.md ? (
            <div className="EventListPage-menu" style={{ marginRight: 'auto' }}>
              {internalLinks}
              {externalLinks}
            </div>
          ) : (
            <MobileMenu
              isVisible={isMenuVisibile}
              onToggle={bool => setMenuVisibility(bool)}
              internalLinks={internalLinks}
              externalLinks={externalLinks}
            />
          )}
        </div>
      </div>
    </header>
  );
}
