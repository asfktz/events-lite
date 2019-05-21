import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import './style.scss';
import cx from 'classnames';
import useLockScroll from '../../utils/useLockScroll';

export default function Modal ({ onClose, shrink, children, padding, ...props }) {
  useLockScroll();

  const contents = (
    <Fragment>
      <div className="Overlay" onClick={onClose} />
      <div className={cx('Modal', { 'Modal--shrink': shrink })}>
        <div className="Modal-main" style={{ padding }}>
          {children}
        </div>
      </div>
    </Fragment>
  );

  return createPortal(contents, document.body)
}