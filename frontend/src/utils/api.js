import qs from 'qs';

import { defaultTokenData } from 'models/auth';

import storage from './storage';

const { REACT_APP_API_ENDPOINT } = process.env;

const getToken = () => {
	const tokenData = storage.getItem('token');

	return tokenData === null ? defaultTokenData : JSON.parse(tokenData);
};

export const generateUrl = (url, params) => {
	const paramsString = qs.stringify(params, { arrayFormat: 'brackets', encode: encodeURI });

	const URL =
		paramsString !== ''
			? `${REACT_APP_API_ENDPOINT}/${url}?${paramsString}`
			: `${REACT_APP_API_ENDPOINT}/${url}`;

	return URL;
};

export const wrapFetch = async (url, options = { headers: {} }, params = {}) => {
	const URL = generateUrl(url, params);

	const headers = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		...options.headers,
	});

	const result = await fetch(URL, { ...options, headers });

	return result.json();
};

export const wrapAuthFetch = async (url, options = { headers: {} }, params = {}) => {
	const token = getToken();

	return wrapFetch(
		url,
		{
			...options,
			headers: {
				Authorization: `Bearer ${token.access_token}`,
				...options.headers,
			},
		},
		params,
	);
};

export const wrapFetchFormData = async (url, options, params = {}) => {
	const URL = generateUrl(url, params);

	const result = await fetch(URL, options);

	return result.json();
};

export const wrapAuthFetchFormData = async (url, options, params = {}) => {
	const token = getToken();

	return wrapFetchFormData(
		url,
		{
			...options,
			headers: {
				Authorization: `Bearer ${token.access_token}`,
				...options.headers,
			},
		},
		params,
	);
};
