import './style.scss';
import React, { useState } from 'react';
import { ReactComponent as XIcon } from '../../assets/x.svg';
import Portal from '../Portal';
import useLockScroll from '../../utils/useLockScroll';

import { map, toArray } from 'lodash';

import Select from './Select';

import Checkbox from './Checkbox';
import Radio from './Radio';
import _ from 'lodash';
import * as CONSTANTS from '../../CONSTANTS';

global.CONSTANTS = CONSTANTS;

const daysOptions = [
  // { value: -1, label: 'כל הימים' },
  ...toArray(CONSTANTS.days)
]

function parseChange(name, value, checked) {
  const config = CONSTANTS.filters[name];

  switch (config.type) {
    case 'boolean':
      return checked;

    default:
      return value;
  }
}

export default function FilterDrawer({ query: initialQuery, onSubmit, onClose }) {
  useLockScroll();

  const [query, setState] = useState(initialQuery);

  function handleChange(e) {
    setState({
      ...query,
      [e.target.name]: parseChange(e.target.name, e.target.value, e.target.checked)
    });
  }

  function handleSelectChange(name, value) {
    setState({ ...query, [name]: value });
  }

  function handleSubmit(e) {
    onSubmit(query);
    onClose();
  }

  return (
    <Portal>
      <div className="Overlay" onClick={handleSubmit} />
      <div className="FilterDrawer">
        <div className="FilterDrawer-header">
          <div className="FilterDrawer-heading">מסננים</div>
          <XIcon onClick={handleSubmit} />
        </div>

        <div className="FilterDrawer-main">
          <div className="FilterDrawer-group">
            <div className="FilterGroup-title">מחולק לפי</div>
            {map(CONSTANTS.groupBy, ({ label, value }) => (
                <label key={value} className="FilterDrawer-field">
                  <Radio
                    name="groupBy"
                    value={value}
                    checked={value === query.groupBy}
                    onChange={handleChange}
                  />
                  <span className="FilterDrawer-label">{label}</span>
                </label>
              )
            )}
          </div>

          <div className="FilterDrawer-group">
            <div className="FilterGroup-title">ימים</div>
            <Select
              name="days"
              title="ימים"
              value={query.days}
              options={daysOptions}
              onChange={handleSelectChange}
              renderLabel={() => {
                if (_.isEmpty(query.days)) {
                  return 'כל הימים';
                }

                return _.map(_.pick(CONSTANTS.days, query.days), 'label').join(', ');
              }}
            />
          </div>

          <div className="FilterDrawer-group">
            <div className="FilterGroup-title">ז'אנר</div>
            <Select
              name="genres"
              title="ז'אנרים"
              value={query.genres}
              options={CONSTANTS.genres}
              onChange={handleSelectChange}
              renderLabel={() => {
                if (_.isEmpty(query.genres)) {
                  return 'כל הז\'אנרים';
                }

                const preview = _.map(_.slice(query.genres, 0, 3), (id) => CONSTANTS.genres[id].label);
                const i = _.slice(query.genres, 3).length;

                return `${preview.join(', ') }` + (i ? ` ... (+${i})` : '');
              }}
            />
          </div>

          {/*<div className="FilterDrawer-group">
            <div className="FilterGroup-title">מחנות</div>
            <Select value="כל המחנות" />
          </div>*/}

          <div className="FilterDrawer-group">
            <div className="FilterGroup-title">אזור</div>
            <Select
              name="zones"
              title="אזורים"
              value={query.zones}
              options={CONSTANTS.zones}
              isOpen={false}
              onChange={handleSelectChange}
              renderLabel={() => {
                if (_.isEmpty(query.zones)) {
                  return 'כל האיזורים';
                }

                const preview = _.map(_.slice(query.zones, 0, 3), (id) => CONSTANTS.zones[id].label);
                const i = _.slice(query.zones, 3).length;

                return `${preview.join(', ') }` + (i ? ` ... (+${i})` : '');
              }}
            />
          </div>

          <div className="FilterDrawer-group">
            <div className="FilterGroup-title">העדפות</div>
            <div className="FilterGroup-options">
              <label className="FilterDrawer-field">
                <Checkbox
                  name="futureOnly"
                  checked={query.futureOnly}
                  onChange={handleChange}
                />
                <span className="FilterDrawer-label">רק אירועים עתידיים</span>
              </label>
              <label className="FilterDrawer-field">
                <Checkbox
                  name="favsOnly"
                  checked={query.favsOnly}
                  onChange={handleChange}
                />
                <span className="FilterDrawer-label">רק אירועים שאהבתי</span>
              </label>
              <label className="FilterDrawer-field">
                <Checkbox
                  name="isChildrenFriendly"
                  checked={query.isChildrenFriendly}
                  onChange={handleChange}
                />
                <span className="FilterDrawer-label">מתאים לילדים</span>
              </label>
              <label className="FilterDrawer-field">
                <Checkbox
                  name="isRegistrationRequired"
                  checked={query.isRegistrationRequired}
                  onChange={handleChange}
                />
                <span className="FilterDrawer-label">בהרשמה מראש</span>
              </label>
            </div>
          </div>
        </div>
        {/*<div className="FilterDrawer-footer">
          <div className="FilterDrawer-btn">איפוס</div>
          <div className="FilterDrawer-btn" onClick={handleSubmit}>עדכן</div>
        </div>*/}
      </div>
    </Portal>
  );
}
