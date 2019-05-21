import './style.scss';

import React, {
  useMemo, createContext, useContext,
} from 'react';

import { startsWith } from 'lodash';
import cx from 'classnames';

const ctx = createContext(null);

export function NavTabs({
  children, active, history, match, location, className, ...props
}) {
  const value = useMemo(() => ({
    active, match, history, location,
  }), [active, match, history, location]);

  return (
    <ctx.Provider value={value}>
      <div className={cx('NavTabs', className)} {...props}>{children}</div>
    </ctx.Provider>
  );
}

export const NavTab = ({
  to = '', className, children, style, color, ...props
}) => {
  const { history, location, match } = useContext(ctx);

  const isActive = startsWith(match.url + location.search, to);

  return (
    <div
      {...props}
      onClick={() => history.push(to)}
      className={cx('NavTab', className, { 'NavTab--active': isActive })}
      style={{
        ...style,
        ...(isActive && { color }),
      }}
    >
      {children}
      {isActive && <span className="NavTab-activeLine" style={{ backgroundColor: color }} />}
    </div>
  );
};
