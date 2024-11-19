import React, { useEffect } from 'react';
import { useChallenges } from 'utils/hook/useChallenges';
import styles from './styles.module.scss';

const ChallengesPage = () => {
	const [{ challenges = [] }, { fetchChallenges }] = useChallenges();

	useEffect(() => {
		fetchChallenges();
	}, []);
	const renderChallenge = challenge => (
		<div key={challenge.challengeId} className={styles.challengeCard}>
			<div className={styles.info}>
				<span className={styles.tag}>{challenge.type}</span>
				<h3>{challenge.title}</h3>
				<p>{challenge.description}</p>
			</div>
		</div>
	);

	return (
		<div className={styles.challengesLayout}>
			<section>
				<h2>Featured Challenges</h2>
				<div className={styles.challengeList}>{challenges.filter(c => c.isFeatured).map(renderChallenge)}</div>
			</section>
		</div>
	);
};

export default ChallengesPage;
