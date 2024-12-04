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
				<h3>{challenge.title}</h3>
				<p>{challenge.description}</p>
			</div>
		</div>
	);

	const workoutChallenges = challenges.filter(c => c.type === 'workout');
	const dietChallenges = challenges.filter(c => c.type === 'diet');

	return (
		<div className={styles.challengesLayout}>
			<section>
				<h2>Featured Challenges</h2>
				<div className={styles.challengeList}>{challenges.map(renderChallenge)}</div>
			</section>
			<section>
				<h2>Workout Challenges</h2>
				<div className={styles.challengeList}>{workoutChallenges.map(renderChallenge)}</div>
			</section>
			<section>
				<h2>Diet Challenges</h2>
				<div className={styles.challengeList}>{dietChallenges.map(renderChallenge)}</div>
			</section>
		</div>
	);
};

export default ChallengesPage;
