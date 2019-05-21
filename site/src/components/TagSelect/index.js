import './style.scss';

import React, { useMemo, useState } from 'react'
import { map, keyBy } from 'lodash';
import arrify from 'arrify';
import { get } from 'lodash';
import cx from 'classnames';
import { ReactComponent as XIcon } from '../../assets/x.svg';
import idx from 'idx.macro';

import useStateMerge from '../../utils/useStateMerge';


export default function TagSelect ({ placeholder, value, onClear, onChange, renderSelected, emptyOption, options, className, ...props }) {
	const optionByValue = useMemo(() => keyBy(options, 'value'), [options]);
	const isActive = value !== '';

	renderSelected = renderSelected || ((value, title) => title);

	function handleChange (event) {
		const { value } = event.target;

		if (value === '') {
			onClear();
		} else {
			onChange(value);	
		}
	}

	return (
		<div className={cx('TagSelect', className, { 'TagSelect--active': isActive })} {...props}>
			<div className="TagSelect-label">
				<span className="TagSelect-clickable">
					<div className="TagSelect-clickable-label">
						{idx(optionByValue, $ => $[value].label)}
					</div>

					<select name="" id="" className="TagSelect-hidden" value={value} onChange={handleChange}>
						{map(options, ({ value, label }) => (
							<option key={value} value={value}>{label}</option>
						))}
					</select>
				</span>
				{/*isActive && (
				  <span className="TagSelect-close">
				  	<XIcon className="TagSelect-close-icon" onClick={onClear} />
				  </span>
				)*/}
			</div>
			{/*<div className="TagSelect-input">
				{map(selectedOptions, 'label').join(', ')}
			</div>*/}

			<div className="TagSelect-menu">
				{map(options, ({ value, label }) => (
					<div key={value} className="TagSelect-menuitem">{value} | {label}</div>
				))}
			</div>
		</div>
	);
}