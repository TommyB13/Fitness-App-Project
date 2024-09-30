import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

import { pushRoute } from 'models/routing';
import { getUser, clearUser } from 'models/user';

import { generateUrl, wrapFetchFormData } from 'utils/api';
import storage from 'utils/storage';
import { isExist } from 'utils/helper';
import { useRedux } from 'utils/hook/redux';

export const setLogin = createAction('SET_LOGIN');
export const setLogout = createAction('SET_LOGOUT');

export const updateAccessToken = createAction('UPDATE_ACCESS_TOKEN', token => {
	storage.setItem('token', JSON.stringify(token));

	return token;
});

export const getIdToken = createAction('GET_ID_TOKEN', () => async dispatch => {
	// link to hosted ui (scope don't need to encode)
	const HOSTED_UI_URI =
		generateUrl('login', {
			client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
			response_type: 'code',
			redirect_uri: process.env.REACT_APP_COGNITO_REDIRECT_URI,
		}) + '&scope=email+openid+phone';

	await dispatch(pushRoute({ pathname: HOSTED_UI_URI }));

	return null;
});

export const getAccessToken = createAction('GET_ACCESS_TOKEN', code => async dispatch => {
	// use the code to get access token and store it into local storage
	const token = await wrapFetchFormData(
		'oauth2/token',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
		{
			client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
			grant_type: 'authorization_code',
			code,
			redirect_uri: process.env.REACT_APP_COGNITO_REDIRECT_URI,
		},
	);

	await dispatch(updateAccessToken(token));
	await dispatch(getUser());
	dispatch(setLogin());

	return null;
});

export const loadAuthToken = createAction('LOAD_AUTH_TOKEN', data => ({ data }));

export const logout = createAction('LOGOUT', () => async dispatch => {
	storage.removeItem('token');
	dispatch(clearUser());
	dispatch(setLogout());
	dispatch(pushRoute({ pathname: '/' }));
});

export const defaultTokenData = {
	access_token: '',
	expires_in: 0,
	refresh_token: '',
	token_type: '',
};

const reducer = {
	auth: handleActions(
		{
			LOAD_AUTH_TOKEN: (state, action) => ({
				...state,

				isLogin: !!action.payload.data.access_token,
				token: action.payload.data,
			}),

			UPDATE_ACCESS_TOKEN: (state, action) => ({
				...state,

				token: action.payload,
			}),

			SET_LOGIN: state => ({
				...state,

				isLogin: true,
			}),

			SET_LOGOUT: state => ({
				...state,

				token: defaultTokenData,
				isLogin: false,
			}),
		},
		{
			token: defaultTokenData,
			isLogin: false,
		},
	),
};

const selectAuth = createSelector(
	state => state.auth.token,
	state => state.auth.isLogin,
	(token, isLogin) => ({ token, hasToken: isExist(token.access_token), isLogin }),
);

export const useAuth = () =>
	useRedux(selectAuth, {
		getIdToken,
		getAccessToken,
		logout,
	});

export default { reducer };
