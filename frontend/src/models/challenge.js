import { createAction, handleActions } from 'redux-actions';
// import dayjs from 'dayjs';

import { wrapAuthFetch } from 'utils/api';
import { useRedux } from 'utils/hook/redux';

export const fetchChallenges = createAction('FETCH_CHALLENGES', () => async () => {
	const { data } = await wrapAuthFetch('challenges');

	return data;
	// return data.data.map(d => ({
	// 	...d,
	// 	published_at: isExist(d.published_at)
	// 		? dayjs(d.published_at).format('YYYY 年 MM 月 DD 日')
	// 		: '',
	// }));
});

export const fetchChallengeDetail = createAction('FETCH_CHALLENGE_DETAIL', () => async (_, getState) => {
	const {
		routing: { pathname },
	} = getState();
	const challengeId = pathname.split('/')[2];

	const { data } = await wrapAuthFetch(`challenges/${challengeId}`, {
		method: 'GET',
	});

	return {
		...data.data,
		// published_at: isExist(data.data.published_at)
		// 	? dayjs(data.data.published_at).format('YYYY 年 MM 月 DD 日')
		// 	: '',
	};
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

export const useChallenges = () =>
	useRedux(selectChallenges, {
		fetchChallenges,
		fetchChallengeDetail,
	});

export default { reducer };
