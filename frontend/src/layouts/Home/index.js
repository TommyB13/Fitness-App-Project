import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDisclosure } from '@mantine/hooks';
import { Modal, TextInput, Group, Button, Text } from '@mantine/core';

import { usePosts } from 'models/post';
import { useUserData } from 'models/user';

import PullToChange from 'components/atoms/PullToChange';

import routePath from 'constants/path';

import styles from './styles.module.scss';

function HomePage() {
	const [value, setValue] = useState('');
	const [{ userId, firstLogin }, { updateUser, getUser }] = useUserData();
	const [{ posts }, { fetchPosts }] = usePosts();
	const [opened, { close, open }] = useDisclosure(firstLogin);

	const setToNonFirstLogin = () => {
		updateUser({ firstLogin: false });
		close();
	};

	const submitForm = () => {
		updateUser({
			firstLogin: false,
			displayName: value,
		});
		close();
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	useEffect(() => {
		if (!userId) {
			getUser();
		}
	}, [userId]);

	useEffect(() => {
		if (firstLogin) {
			open();
		} else {
			close();
		}
	}, [firstLogin]);

	return (
		<div className={styles.homeLayout}>
			<PullToChange callback={fetchPosts} />
			{posts.length === 0 ? (
				<Text ta="center" size="lg" mt="lg">
					No posts available.
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

			<Modal opened={opened} onClose={setToNonFirstLogin} title="Update Your Name" centered>
				<TextInput
					label="Display Name"
					placeholder="Your name"
					mt="md"
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
				<Group justify="flex-end" mt="md">
					<Button onClick={submitForm} disabled={!value}>
						Submit
					</Button>
				</Group>
			</Modal>
		</div>
	);
}

export { HomePage };
