import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Text, Group, Button, Modal, TextInput, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useAuth } from 'models/auth';
import { useUserData } from 'models/user';
import { usePosts } from 'models/post';

import routePath from 'constants/path';

import ImageUploader from 'components/atoms/ImageUploader';

import styles from './styles.module.scss';

function ProfilePage() {
	const [{ displayName, imageUrl, userId, points, consecutiveDays }, { getUser, updateUser }] = useUserData();
	const [, { logout }] = useAuth();
	const [{ myPosts }, { fetchMyPosts }] = usePosts();
	const [form, setForm] = useState({ displayName: '' });
	const [opened, { close, open }] = useDisclosure(false);
	const [openedUploader, { close: closeUploader, open: openUploader }] = useDisclosure(false);

	const updateForm = () => {
		updateUser(form);
		close();
	};

	const updateAvatar = url => {
		updateUser({ imageUrl: url });
		closeUploader();
	};

	useEffect(() => {
		fetchMyPosts();
	}, []);

	useEffect(() => {
		if (!userId) {
			getUser();
		}
	}, [userId]);

	return (
		<div className={styles.profileLayout}>
			<Text size="xl" mb="lg">
				Profile
			</Text>
			<img src={imageUrl} alt="avatar" onClick={openUploader} />
			<ul>
				<li>Name: {displayName}</li>
				<li>Points: {points}</li>
				<li>Consecutive Days: {consecutiveDays}</li>
			</ul>
			<Group justify="center" mt="md">
				<Button variant="filled" onClick={open}>
					Edit
				</Button>
				<Button variant="filled" onClick={logout}>
					Logout
				</Button>
			</Group>

			<Divider mt="lg" mb="lg" />

			<Text size="xl" mb="lg">
				My Posts
			</Text>
			{myPosts.length === 0 ? (
				<Text ta="center" size="lg" mt="lg">
					No posts available.
				</Text>
			) : (
				myPosts.map((post, index) => (
					<Link to={`${routePath.myPost}/${post.postId}`} key={index} className={styles.post}>
						<div className={styles.postHeader}>
							<img src={post.profileImgUrl} alt="Profile" className={styles.profileImage} />
							<div className={styles.userInfo}>
								<h3 className={styles.username}>{post.displayName}</h3>
								<span className={styles.timestamp}>{dayjs(post.createdDate).format('YYYY-MM-DD')}</span>
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

			<Modal opened={opened} onClose={close} title="Update Your Profile" centered>
				<TextInput
					label="Display Name"
					placeholder="Your name"
					mt="md"
					value={form.displayName}
					onChange={e => setForm({ ...form, displayName: e.target.value })}
				/>
				<Group justify="flex-end" mt="md">
					<Button onClick={updateForm} disabled={!form.displayName}>
						Submit
					</Button>
				</Group>
			</Modal>

			<Modal opened={openedUploader} onClose={closeUploader} title="Update Your Avatar" centered>
				<ImageUploader type="avatar" callback={updateAvatar} />
			</Modal>
		</div>
	);
}

export { ProfilePage };
