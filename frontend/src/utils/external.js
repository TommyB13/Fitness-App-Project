import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import objectSupport from 'dayjs/plugin/objectSupport';
import { loadAuthToken, defaultTokenData } from 'models/auth';

import storage from './storage';

export const loadConfigFromLocalStorage = store => {
	const tokenData = storage.getItem('token');

	const token = tokenData === null ? defaultTokenData : JSON.parse(tokenData);

	store.dispatch(loadAuthToken(token));
};

export const extendDayjsPlugin = () => {
	dayjs.extend(customParseFormat);
	dayjs.extend(objectSupport);
};
