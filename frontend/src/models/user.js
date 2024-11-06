import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

import { useRedux } from 'utils/hook/redux';
import { wrapAuthFetch } from 'utils/api';

export const defaultUserData = {
	displayName: '',
	imageUrl: '',
	createdDate: '',
	userId: '',
	points: 0,
	challenges: [],
	consecutiveDays: 0,
	firstLogin: false,
	name: '',
};

export const getUser = createAction('FETCH_USER', () => async () => {
	const { data } = await wrapAuthFetch(
		'me', // 'oauth2/userInfo',
		{
			method: 'GET',
		},
		{},
		// true,
	);

	return data;
});

export const updateUser = createAction('UPDATE_USER', form => async () => {
	const { data } = await wrapAuthFetch('me', {
		method: 'PUT',
		body: JSON.stringify(form),
	});

	return data;
});

export const createUser = createAction('CREATE_USER', () => async () => {
	const { data } = await wrapAuthFetch('users', {
		method: 'POST',
		body: JSON.stringify({}),
	});

	console.log(data);

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
		createUser,
		getUser,
		updateUser,
	});

export default { reducer };
