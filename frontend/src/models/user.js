import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

import { useRedux } from 'utils/hook/redux';
import { wrapAuthFetch } from 'utils/api';

export const defaultUserData = {
	sub: '',
	email_verified: false,
	email: '',
	username: '',
};

export const getUser = createAction('FETCH_USER', () => async () => {
	const data = await wrapAuthFetch('oauth2/userInfo', {
		method: 'GET',
	});

	return data;
});

export const clearUser = createAction('CLEAR_USER');

const reducer = {
	user: handleActions(
		{
			FETCH_USER_FULFILLED: (state, action) => ({
				...state,

				data: {
					...state.data,
					...action.payload,
				},
			}),

			CLEAR_USER_FULFILLED: state => ({
				...state,

				data: defaultUserData,
			}),
		},
		{
			data: defaultUserData,
		},
	),
};

const selectUserData = createSelector(
	state => state.user.data,
	data => data,
);

export const useUserData = () =>
	useRedux(selectUserData, {
		getUser,
	});

export default { reducer };
