import './style.css'
import React from 'react';
import cx from 'classnames';

export default function Ratio ({ className, ratio = 1, children, ...props }) {
	return (
		<div className={cx('Ratio', className)} {...props}>
			<div
				className="Ratio-placeholder"
				style={{ paddingTop: `${100 * ratio}%` }}
			/>
			<div className="Ratio-content">{children}</div>
		</div>
	);
}