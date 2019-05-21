import { compact } from 'lodash';

export function formatLocationName ({ name, surname, type }) {
	return type === 'venue' ? `בית משפחת ${surname}` : name;
}

export function formatAddress ({ type, name, surname, address }) {
	const locationName = formatLocationName({ type, name, surname });
	return compact([locationName, address]).join(', ')
}