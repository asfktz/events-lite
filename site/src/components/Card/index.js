import './style.css';

import React from 'react';
import cx from 'classnames';

export default function Card ({ children, ...props }) {
	const className = cx(
  		'Card',
  		{ 'Card--clickable': Boolean(props.onClick) },
  		props.className
  	);

	return (
	  <div {...props} className={className}>
	  	{children}
	  </div>
	);
}