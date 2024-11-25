import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChallenges } from 'utils/hook/useChallenges';
import styles from './styles.module.scss';

const ChallengesPage = () => {
	const [{ challenges = [] }, { fetchChallenges }] = useChallenges();
	const navigate = useNavigate();

	useEffect(() => {
		fetchChallenges();
	}, []);

	const handleChallengeClick = id => {
		navigate(`/challenge/${id}`);
	};

	const renderChallenge = challenge => (
		<div
			key={challenge.challengeId}
			className={styles.challengeCard}
			onClick={() => handleChallengeClick(challenge.challengeId)}
		>
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
				<h2>Featured Challenges</h2>
				<div className={styles.challengeList}>{challenges.filter(c => c.isFeatured).map(renderChallenge)}</div>
			</section>
		</div>
	);
};

export default ChallengesPage;
