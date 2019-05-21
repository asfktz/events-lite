import './style.scss';

import React, { useEffect } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import { ReactComponent as MenuIcon } from '../assets/menu.svg';

export default withRouter(({
  children, className, isVisible, onToggle, match, location,
  userLogin,
  internalLinks,
  externalLinks,
  ...props
}) => {
  useEffect(() => {
    if (isVisible) onToggle(false);
  }, [location.pathname]);

  return (
    <div className={cx('MobileMenu')}>
      <MenuIcon
        className="MobileMenu-icon"
        onClick={() => onToggle(!isVisible)}
      />

      <SwipeableDrawer
        anchor="right"
        open={isVisible}
        onClose={() => onToggle(false)}
        onOpen={() => onToggle(true)}
      >
        <div className="MobileMenu-main">
          <div className="MobileMenu-header">
            <div className="MobileMenu-title">תפריט התכנייה</div>
            <div className="MobileMenu-user">
              {userLogin}
            </div>
          </div>
          <div>
            <div className="MobileMenu-menu">{internalLinks}</div>
            <div className="MobileMenu-menu">{externalLinks}</div>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
});
