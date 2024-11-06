import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, TextInput, Group, Button } from '@mantine/core';

import { usePosts } from 'models/post';
import { useUserData } from 'models/user';

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

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div className={styles.homeLayout}>
			<div className={styles.header}>
				<h1>Home</h1>
			</div>

			{posts.length === 0 ? (
				<p>No posts available.</p>
			) : (
				posts.map((post, index) => (
					<div key={index} className={styles.post}>
						<div className={styles.postHeader}>
							<img src="path_to_profile_image.jpg" alt="Profile" className={styles.profileImage} />
							<div className={styles.userInfo}>
								<h3 className={styles.username}>Username</h3>
								<span className={styles.timestamp}>Just now</span>
							</div>
						</div>
						<img src={post.image} alt="Post Image" className={styles.postImage} />
						<div className={styles.postContent}>
							<h2 className={styles.postHeading}>{post.heading}</h2>
							<p className={styles.postDescription}>{post.description}</p>
						</div>
					</div>
				))
			)}

			<Modal opened={opened} onClose={setToNonFirstLogin} title="Update Your Name" centered>
				<TextInput label="Display Name" placeholder="Your name" mt="md" value={value} onChange={e => setValue(e.target.value)} />
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
