import React, { Fragment } from 'react';
import { ReactComponent as ArrowDownIcon } from '../../assets/chevron-down.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left.svg';
import useToggle from '../../utils/useToggle';
import { ReactComponent as XIcon } from '../../assets/x.svg';

import _, { map } from 'lodash';
import Portal from '../Portal';
import Checkbox from './Checkbox';

export default function Select({
  name,
  value,
  defaultValue,
  renderLabel = () => value,
  isOpen: initialIsOpen = false,
  title,
  options,
  onChange,
  ...props
}) {
  const [isOpen, toggle] = useToggle(false);

  const isAllSelected = !value.length;

  console.log(value.length);

  function handleChange(optionValue) {
    const nextValue = _.includes(value, optionValue)
      ? _.without(value, optionValue)
      : _.concat(value, optionValue);

    onChange(name, nextValue);
  }

  function handleSelectAll () {
    onChange(name, []);
  }

  return (
    <Fragment>
      <div className="FilterGroup-selected" onClick={toggle}>
        <span className="FilterGroup-selected-label">{renderLabel()}</span>
        <ArrowDownIcon
          style={{
            marginRight: '0.5em',
            width: '1em',
            height: '1em'
          }}
        />
      </div>
      {isOpen && (
        <Portal>
          <div className="FilterDrawer" style={{ zIndex: 200 }}>
            <div className="FilterDrawer-header">
              <div className="FilterDrawer-heading">מסננים</div>
              <ArrowLeftIcon onClick={toggle} />
            </div>

            <div className="FilterDrawer-main">
              <div className="FilterDrawer-group">
                <div className="FilterGroup-title">אילו {title} מעניינים אתכם?</div>
                <label className="FilterDrawer-field">
                  <Checkbox
                    name="groupBy"
                    value=""
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                  <span className="FilterDrawer-label">הכל</span>
                </label>
                {map(options, ({ label, value: optionValue }) => (
                  <label key={optionValue} className="FilterDrawer-field">
                    <Checkbox
                      name="groupBy"
                      value={optionValue}
                      checked={_.includes(value, optionValue)}
                      onChange={() => handleChange(optionValue)}
                    />
                    <span className="FilterDrawer-label">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/*<div className="FilterDrawer-footer">
              <div className="FilterDrawer-btn">איפוס</div>
              <div className="FilterDrawer-btn" onClick={toggle}>עדכן</div>
            </div>*/}
          </div>
          
        </Portal>
      )}
    </Fragment>
  );
}
