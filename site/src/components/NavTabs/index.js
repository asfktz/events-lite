import './style.scss';

// import 'scroll-behavior-polyfill';

import React, {
  useMemo, createContext, useContext, useEffect, useRef, useCallback,
} from 'react';

import { startsWith, values } from 'lodash';
import cx from 'classnames';

import { useRect } from '@reach/rect';

const ctx = createContext(null);

function useMemoObj(props) {
  return useMemo(() => props, values(props));
}

export function NavTabs({
  children, active, history, match, location, className, scrollOnNav, ...props
}) {
  const contRef = useRef(null);

  const value = useMemoObj({
    active,
    match,
    history,
    location,
    handleTabClick: useCallback((to) => {
      history.push(to);
      if (scrollOnNav) {
        window.scroll(0, 0);
      }
    }),
    scrollToTab: useCallback((tabRef) => {
      const contEl = contRef.current;
      const contRect = contRef.current.getBoundingClientRect();
      const tabRect = tabRef.current.getBoundingClientRect();
      const delta = tabRect.right - contRect.right;

      contRef.current.scrollLeft = (
        contEl.scrollLeft + delta + (contRect.width / 2) - (tabRect.width / 2)
      );
    }),
  });

  return (
    <ctx.Provider value={value}>
      <div ref={contRef} className={cx('NavTabs', className)} {...props}>{children}</div>
    </ctx.Provider>
  );
}

export const NavTab = ({
  to = '', className, children, style, color, isActive: isActiveProps, ...props
}) => {
  const tabRef = useRef(null);
  // const tabRect = useRect(tabRef, true);

  const { history, location, scrollToTab, handleTabClick } = useContext(ctx);

  const isActive = isActiveProps || startsWith(location.pathname + location.search, to);

  useEffect(() => {
    if (isActive) scrollToTab(tabRef);
  }, [isActive, tabRef]);

  return (
    <div
      {...props}
      ref={tabRef}
      onClick={() => handleTabClick(to)}
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
