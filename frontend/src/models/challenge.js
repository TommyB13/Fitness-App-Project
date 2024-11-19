import { createAction, handleActions } from 'redux-actions';
import { wrapAuthFetch } from 'utils/api';
import { useRedux } from 'utils/hook/redux';

export const fetchChallenges = createAction('FETCH_CHALLENGES', () => async () => {
	const { data } = await wrapAuthFetch('challenges');
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
};

const reducer = {
	challenge: handleActions(
		{
			FETCH_CHALLENGES_FULFILLED: (state, action) => ({
				...state,
				challenges: action.payload,
			}),
			FETCH_CHALLENGES_DETAILS_FULFILLED: (state, action) => ({
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

export const useChallenges = () => useRedux(selectChallenges, { fetchChallenges });

export default { reducer };
