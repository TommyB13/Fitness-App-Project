import { loadAuthToken, defaultTokenData } from 'models/auth';

import storage from './storage';

export const loadConfigFromLocalStorage = store => {
	const tokenData = storage.getItem('token');

	const token = tokenData === null ? defaultTokenData : JSON.parse(tokenData);

	store.dispatch(loadAuthToken(token));
};
