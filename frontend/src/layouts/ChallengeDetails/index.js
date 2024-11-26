import React, { useEffect } from 'react';

import { useChallenges } from 'models/challenge';
import { useRouting } from 'models/routing';

import routePath from 'constants/path';

import styles from './styles.module.scss';

const ChallengeDetail = () => {
	const [{ pathname }] = useRouting();
	const [{ targetChallenge }, { fetchChallengeDetail }] = useChallenges();

	useEffect(() => {
		if (pathname.includes(routePath.challenge + '/')) {
			fetchChallengeDetail();
		}
	}, [pathname]);

	if (!targetChallenge.title) {
		return <div>Challenge not found</div>;
	}

	return (
		<div className={styles.challengeDetail}>
			<h2>{targetChallenge.title}</h2>
			<img src={targetChallenge.imgUrl || 'placeholder.png'} alt={targetChallenge.title} />
			<p>{targetChallenge.description}</p>
			<span>Type: {targetChallenge.type}</span>
			<span>Completion: {targetChallenge.percentage}%</span>
		</div>
	);
};

export default ChallengeDetail;
