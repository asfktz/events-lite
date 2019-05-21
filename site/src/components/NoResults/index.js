import './style.scss';
import React, { useMemo } from 'react';
import { random, keys, isFunction, size, omitBy } from 'lodash';

import { Link } from 'react-router-dom';

function toFunc (value) {
	return isFunction(value) ? value : () => value;
}

const tooManyFilters =  [
	'וואו, זאת היתה בקשה ממש ספציפית',
	'אפילו בג\'פניקה אין קומבינציות כאלה',
	'משונה, 707 אירועים ואפילו אחד לא עונה על כל הדרישות שלך...',
	'אוקיי, זה קצת יותר מדי ספציפי בשבילנו',
	'נסחפת קצת עם הסינון ;)'
].map((title) => ({
	getTitle: toFunc(title),
	tip: 'נסי/ה להוריד את אחד הסינונים או לשוטט לאירוע אחר...'
}));


const freeTextTypo =  [
	({ term }) => `לו רק היו יותר מ-700 אירועים לחפש בהם אולי היינו מוצאים את "${term}"`,
	// ({ term }) => ([
	// 	'לא הצלחנו למצוא שם עד כדי כך יצירתי…',
	// 	<br/>,
	// 	'אפילו לא אצל מתן שאחראי על הפרפורמנס ברמת טבעון.'
	// ]),
].map((title) => ({
	getTitle: toFunc(title),
	tip: 'או שאולי הקלדת שגיאת כתיב? רוצה לבדוק שוב?'
}));

function useRandom (items) {
	return useMemo(() => items[random(0, items.length - 1)], [items]);
}

export default function NoResults ({ events, query }) {
	const manyFiltes = !query.term && size(omitBy(query, v => !Boolean(v))) > 1;
	const titles = manyFiltes ? tooManyFilters : freeTextTypo;
	const eventIds = useMemo(() => keys(events))
	const { getTitle, tip } = useRandom(titles);
	const eventId = useRandom(eventIds);

	return (
		<div className="NoResults">
			<div className="NoResults-title">{getTitle(query)}</div>
			<div className="NoResults-text">{tip}</div>
			<div className="NoResults-btns">
				<Link to="/search" className="NoResults-btn is-secondary">לכל האירועים</Link>
				<Link to={`/events/${eventId}`} className="NoResults-btn">תפתיעו אותי!</Link>
			</div>
		</div>
	);
}