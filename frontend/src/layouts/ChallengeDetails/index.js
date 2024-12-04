import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text, rem } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { useChallenges } from 'models/challenge';
import { useRouting } from 'models/routing';

import routePath from 'constants/path';

import styles from './styles.module.scss';

const ChallengeDetail = () => {
	const [{ pathname }] = useRouting();
	const [{ targetChallenge }, { fetchChallengeDetail }] = useChallenges();
	const { posts } = targetChallenge;

	useEffect(() => {
		if (pathname.includes(routePath.challenge + '/')) {
			fetchChallengeDetail();
		}
	}, [pathname]);

	if (!targetChallenge.title) {
		return <div>Challenge not found</div>;
	}

	return (
		<div className={styles.homeLayout}>
			<Link to={-1}>
				<IconArrowLeft style={{ width: rem(40), height: rem(40) }} stroke={1.5} color="black" />
			</Link>
			<div className={styles.challengeCard}>
				<h2>{targetChallenge.title}</h2>
				<img src={targetChallenge.imgUrl || 'placeholder.png'} alt={targetChallenge.title} />
				<div className={styles.info}>
					<span className={styles.tag}>{targetChallenge.type}</span>
					<span className={styles.progress}>{targetChallenge.reward}</span>
				</div>
				<h3>{targetChallenge.subtitle}</h3>
				<p>{targetChallenge.description}</p>
			</div>
			<Text size="xl" mb="lg" mt="md">
				Posts in this challenge
			</Text>
			<div className={styles.commentWrapper}>
				{posts.length === 0 ? (
					<Text ta="center" size="lg" mt="lg">
						No posts
					</Text>
				) : (
					posts
						.sort((a, b) => dayjs(b.createdDate).valueOf() - dayjs(a.createdDate).valueOf())
						.map((post, index) => (
							<Link to={`${routePath.post}/${post.postId}`} key={index} className={styles.post}>
								<div className={styles.postHeader}>
									<img src={post.profileImgUrl} alt="Profile" className={styles.profileImage} />
									<div className={styles.userInfo}>
										<h3 className={styles.username}>{post.displayName}</h3>
										<span className={styles.timestamp}>{dayjs(post.createdDate).format('YYYY-MM-DD hh:mm')}</span>
									</div>
								</div>
								<img src={post.imgUrl} alt="Post" className={styles.postImage} />
								<div className={styles.postContent}>
									<h2 className={styles.postHeading}>{post.title}</h2>
									<p className={styles.postDescription}>{post.content}</p>
								</div>
							</Link>
						))
				)}
			</div>
		</div>
	);
};

export default ChallengeDetail;
