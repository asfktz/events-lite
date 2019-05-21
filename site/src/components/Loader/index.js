import './style.css';

import React, { useState } from 'react';
import Spinner from 'react-md-spinner';
import useInterval from '../../utils/useInterval';
import { random } from 'lodash';

const labels = [
	'מכוונים את הגיטרות',
	'פורשים מחצלות',
	'מסדרים כיסאות',
	'עושים מתיחות',
	'מדליקים את האש',
	'מחממים את הקול',
	'מבריקים את הפרקט',
	'מרכיבים את הבמות',
	'פותחים חצרות ',
	'מארגנים זולות',
	'עורכים סרטים',
	'בחזרות גנרליות',
	'מודדים תלבושות',
	'משננים טקסטים',
];

function useRoulette (values, ms) {
	const [i, set] = useState(random(0, labels.length - 1));

	useInterval(() => {
		set((i) => i + 1);
	}, ms);

	return labels[i % labels.length];
}

export default function Loader () {
	const label = useRoulette(labels, 3000);

	return (
	  <div className="Loader">
	  	<Spinner className="Loader-spinner" size={70} singleColor="#5C2E82" borderSize={2} />
	  	<div className="Loader-label">{label}</div>
	  </div>
	);
}