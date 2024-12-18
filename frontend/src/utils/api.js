import qs from 'qs';

import { defaultTokenData } from 'models/auth';

import storage from './storage';

const { REACT_APP_COGNITO_API_ENDPOINT, REACT_APP_LAMBDA_API_ENDPOINT } = process.env;

const getToken = () => {
	const tokenData = storage.getItem('token');

	return tokenData === null ? defaultTokenData : JSON.parse(tokenData);
};

const refreshToken = async () => {
	const token = getToken();

	if (!token?.refresh_token) {
		console.warn('Refresh token not found. User may need to log in again.');
		storage.removeItem('token');
		window.location.href = '/';
		return null;
	}

	try {
		const newToken = await wrapFetchFormData(
			'oauth2/token',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
			{
				client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
				grant_type: 'refresh_token',
				refresh_token: token.refresh_token,
				redirect_uri: process.env.REACT_APP_COGNITO_REDIRECT_URI,
			},
			true,
		);

		storage.setItem('token', JSON.stringify({ ...newToken, expiryTime: Date.now() + newToken.expires_in * 1000 }));

		return newToken;
	} catch (error) {
		console.error('Error refreshing token:', error.message);
		storage.removeItem('token');
		window.location.href = '/';
		return null;
	}
};

const isTokenValid = token => {
	if (!token || !token.expiryTime) return false;

	const bufferTime = 5 * 60 * 1000; // 5 mins before expiry
	return Date.now() < token.expiryTime - bufferTime;
};

export const generateUrl = (url, params, isCognito = false) => {
	const paramsString = qs.stringify(params, { arrayFormat: 'brackets', encode: encodeURI });
	const endpoint = isCognito ? REACT_APP_COGNITO_API_ENDPOINT : REACT_APP_LAMBDA_API_ENDPOINT;

	const URL = paramsString !== '' ? `${endpoint}/${url}?${paramsString}` : `${endpoint}/${url}`;

	return URL;
};

export const wrapFetch = async (url, options = { headers: {} }, params = {}, isCognito = false) => {
	const URL = generateUrl(url, params, isCognito);

	const headers = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		...options.headers,
	});

	const result = await fetch(URL, { ...options, headers });
	const data = await result.json();

	return { status: result.status, data };
};

export const wrapAuthFetch = async (url, options = { headers: {} }, params = {}, isCognito = false) => {
	let token = getToken();

	if (!isTokenValid(token)) {
		token = await refreshToken();
	}

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
		isCognito,
	);
};

export const wrapFetchFormData = async (url, options, params = {}, isCognito = false) => {
	const URL = generateUrl(url, params, isCognito);

	const result = await fetch(URL, options);

	return result.json();
};

export const wrapAuthFetchFormData = async (url, options, params = {}, isCognito = false) => {
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
		isCognito,
	);
};
