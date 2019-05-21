import './style.scss';
import React from 'react';
import * as CONSTANTS from '../../CONSTANTS';
import { ReactComponent as XIcon } from '../../assets/x.svg';
import _ from 'lodash';

export function FilterTagList ({ children }) {
    return (
      <div className="FilterTagList">
        {/*<FilterPickerTag />*/}
        {children}
      </div>
    )
}

function getLabel (type, value) {
    if (type === 'term') {
        return 'טקסט חופשי';
    }

    if (_.isBoolean(value)) {
        return CONSTANTS.filters[type].label
    }

    if (type === 'groupBy') {
        return `מחולק לפי ${CONSTANTS[type][value].label}`;
    }

    return CONSTANTS[type][value].label;
}

export function FilterTag ({ type, value, ...props }) {
    const label = getLabel(type, value);

    return (
        <span className="FilterTag-spacer">
          <span className="FilterTag" {...props}>
            <span>{label}</span>
            <XIcon className="FilterTag-close" />
          </span>
        </span>
    )
}

export function FilterPickerTag (...props) {
    return (
      <span className="FilterTag-spacer">
        <span className="FilterTag FilterTag--btn">
          <span>סינון...</span>
        </span>
      </span>
    );
}