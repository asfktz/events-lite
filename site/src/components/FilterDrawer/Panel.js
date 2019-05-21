import React from 'react';
import { ReactComponent as ArrowIcon } from '../../assets/arrow-right.svg';

export default function Panel ({ title, children, onClose, onSelect, onReset }) {
  return (
    <div className="FilterDrawer">
        <div className="FilterDrawer-header">
            <ArrowIcon className="FilterDrawer-arrow" onClick={onClose} />
            <div className="FilterDrawer-heading">{title}</div>
            <div className="FilterDrawer-reset">נקה הכל</div>
        </div>

        <div className="FilterDrawer-main">
          { children }
        </div>
    </div>
  );
}