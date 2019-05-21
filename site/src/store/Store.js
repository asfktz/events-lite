import React, { createContext, useMemo, useContext } from 'react';
// import useInstance from './utils/useInstance';
import createStore from './createStore';
import api from '../api';

const context = createContext(null);

export function Store ({ children }) {

	const store = useMemo(() => ({
		getEvents: api.getEvents
	}), [])

	return (
		<context.Provider value={store}>
			{children}
		</context.Provider>
	);
}

export const useStore = () => useContext(context);