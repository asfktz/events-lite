import * as api from '../api';
import useStateMerge from '../utils/useStateMerge';

export default function createStore ({ setCache }) {
	return {
		getEvents () {
			return api.getEvents();
		}
	}
}