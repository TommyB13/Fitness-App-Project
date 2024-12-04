import { useEffect } from 'react';
import { useRedux } from 'utils/hook/redux';
import { fetchChallenges } from 'models/challenge';

const selectChallenges = state => state.challenge;

export const useChallenges = () =>
	useRedux(selectChallenges, {
		fetchChallenges,
	});
