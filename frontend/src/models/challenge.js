import { createAction, handleActions } from 'redux-actions';

import { wrapAuthFetch } from 'utils/api';
import { useRedux } from 'utils/hook/redux';

export const fetchChallenges = createAction('FETCH_CHALLENGES', () => async () => {
	const { data } = await wrapAuthFetch('challenges');
	return data;
});

export const fetchChallengeDetail = createAction('FETCH_CHALLENGE_DETAIL', () => async (_, getState) => {
	const {
		routing: { pathname },
	} = getState();
	const postId = pathname.split('/')[2];
	const { data } = await wrapAuthFetch(`challenges/${postId}`, {
		method: 'GET',
	});

	return data;
});

const defaultTargetChallengeData = {
	isFeatured: false,
	challengeId: '',
	reward: '',
	subtitle: '',
	description: '',
	imgUrl: '',
	type: '',
	title: '',
	posts: [],
};

const reducer = {
	challenge: handleActions(
		{
			FETCH_CHALLENGES_FULFILLED: (state, action) => ({
				...state,
				challenges: action.payload,
			}),
			FETCH_CHALLENGE_DETAIL_FULFILLED: (state, action) => ({
				...state,
				targetChallenge: action.payload,
			}),
		},
		{
			challenges: [],
			targetChallenge: defaultTargetChallengeData,
		},
	),
};

const selectChallenges = state => state.challenge;

export const useChallenges = () => useRedux(selectChallenges, { fetchChallenges, fetchChallengeDetail });

export default { reducer };
