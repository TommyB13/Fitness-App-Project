import React, { useEffect } from 'react';
import { useChallenges } from 'utils/hook/useChallenges';
import styles from './styles.module.scss';

const ChallengesPage = () => {
	const [{ challenges = [] }, { fetchChallenges }] = useChallenges();

	useEffect(() => {
		fetchChallenges();
	}, [fetchChallenges]);
	const renderChallenge = challenge => (
		<div key={challenge.challengeId} className={styles.challengeCard}>
			<div className={styles.imagePlaceholder}>
				<img src={challenge.imgUrl || 'placeholder.png'} alt={challenge.title} />
			</div>
			<div className={styles.info}>
				<span className={styles.tag}>{challenge.type}</span>
				<span className={styles.progress}>{challenge.percentage}%</span>
				<h3>{challenge.title}</h3>
				<p>{challenge.description}</p>
			</div>
		</div>
	);

	return (
		<div className={styles.challengesLayout}>
			<section>
				<h2>
					Ongoing Challenges <button className={styles.linkButton}>more</button>
				</h2>
				<div className={styles.challengeList}>{challenges.filter(c => c.ongoing).map(renderChallenge)}</div>
			</section>
			<section>
				<h2>
					Featured Challenges <button className={styles.linkButton}>more</button>
				</h2>
				<div className={styles.challengeList}>{challenges.filter(c => c.featured).map(renderChallenge)}</div>
			</section>
		</div>
	);
};

export default ChallengesPage;
