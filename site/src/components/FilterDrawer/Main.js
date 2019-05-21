import React from 'react';
import { getSelectedDays } from './localState';
import _ from 'lodash';

function Group ({ name, title, renderSelection = () => {}, onPick, children, ...props }) {
    return (
      <div {...props} className="FilterGroup">
            <div className="FilterGroup-icon"></div>
            <div className="FilterGroup-main">
                <div className="FilterGroup-title">{title}</div>
                <div className="FilterGroup-selected">{renderSelection()}</div>
            </div>
      </div>
    );
}

export default function Main ({ state, dispatch, onPick }) {
  const handlePick = (pickerType) => () => {
    dispatch({ type: 'OPEN_PICKER', pickerType })
  };

  return (
    
      <div className="FilterDrawer">
          <div className="FilterDrawer-header">
              <div className="FilterDrawer-heading">סינון לפי</div>
              <div className="FilterDrawer-reset">נקה הכל</div>
          </div>

          <div className="FilterDrawer-main">
            <Group
              title="ימים"
              onClick={handlePick('days')}
              renderSelection={() => {
                return _.map(getSelectedDays(state), 'name').join(', ');
              }}
            />
            
            <Group title="ז'אנר" onClick={handlePick('genres')} />
            <Group title="מחנות" onClick={handlePick('camps')} />
            <Group title="מיון" onClick={handlePick('order')}  />
          </div>
      </div>
  );
}