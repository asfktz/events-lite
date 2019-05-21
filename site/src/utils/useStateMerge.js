import { useState } from 'react';
import isFunction from 'lodash/isFunction';

export default function useStateMerge (defaultState) {
	const [state, setState] = useState(defaultState);

	return [
		state,
		(change) => setState((state) => {
			change = isFunction(change) ? change(state) : change;
			return { ...state, ...change };
		})
	];
}