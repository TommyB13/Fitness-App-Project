import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Group, Button, Modal, Select, Textarea, TextInput, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft } from '@tabler/icons-react';

import { usePosts } from 'models/post';
import { useRouting } from 'models/routing';
import { useChallenges } from 'models/challenge';

import routePath from 'constants/path';

import styles from './styles.module.scss';

function PostDetail() {
	const [{ pathname }] = useRouting();
	const [{ targetPost }, { fetchPostDetail, fetchMyPostDetail, updatePost, deletePost, addComment }] = usePosts();
	const {
		profileImgUrl,
		displayName,
		createdDate,
		title,
		content,
		imgUrl,
		challenge,
		completed,
		percentage,
		comments,
	} = targetPost;
	const [{ challenges }, { fetchChallenges }] = useChallenges();
	const [editable, setEditable] = useState(false);
	const [opened, { close, open }] = useDisclosure(false);
	const [openedDialog, { close: closeDialog, open: openDialog }] = useDisclosure(false);
	const [editPost, setEditPost] = useState({
		title: '',
		challenge: '',
		completed: false,
		content: '',
		imgUrl: '',
		percentage: 0,
	});
	const [comment, setComment] = useState('');

	const handleInputChange = e => {
		const { name, value } = e.target;
		setEditPost({ ...editPost, [name]: value });
	};

	const handleUpdatePost = e => {
		e.preventDefault();
		close();
		updatePost(editPost);
	};

	const handleDeletePost = () => {
		closeDialog();
		deletePost(targetPost);
	};

	const handleAddComment = () => {
		addComment(comment);
		setComment('');
	};

	useEffect(() => {
		fetchChallenges();
	}, []);

	useEffect(() => {
		if (editable && targetPost.postId) {
			setEditPost({
				title,
				challenge,
				completed,
				content,
				imgUrl,
				percentage,
			});
		}
	}, [editable, targetPost]);

	useEffect(() => {
		if (pathname.includes(routePath.post + '/')) {
			if (pathname.includes('/profile')) {
				fetchMyPostDetail();
				setEditable(true);
			} else {
				fetchPostDetail();
			}
		}
	}, [pathname]);

	return (
		<div className={styles.homeLayout}>
			<Link to={-1}>
				<IconArrowLeft style={{ width: rem(40), height: rem(40) }} stroke={1.5} color="black" />
			</Link>
			<div className={styles.post}>
				<div className={styles.postHeader}>
					<img src={profileImgUrl} alt="Profile" className={styles.profileImage} />
					<div className={styles.userInfo}>
						<h3 className={styles.username}>{displayName}</h3>
						<span className={styles.timestamp}>{dayjs(createdDate).format('YYYY-MM-DD')}</span>
					</div>
					{editable && (
						<>
							<Button variant="filled" onClick={open} style={{ padding: '4px 12px', marginLeft: 'auto' }}>
								Edit
							</Button>
							<Button variant="filled" onClick={openDialog} style={{ padding: '4px 12px', marginLeft: 8 }} color="red">
								Delete
							</Button>
						</>
					)}
				</div>
				<img src={imgUrl} alt="Post" className={styles.postImage} />
				<div className={styles.postContent}>
					<h2 className={styles.postHeading}>{title}</h2>
					<p className={styles.postDescription}>{content}</p>
				</div>
			</div>

			<Text size="xl" mb="lg" mt="md">
				Comments
			</Text>

			<div className={styles.commentWrapper}>
				{comments.length === 0 ? (
					<Text ta="center" size="lg" mt="lg">
						No comments
					</Text>
				) : (
					comments
						.sort((a, b) => dayjs(a.createdDate).valueOf() - dayjs(b.createdDate).valueOf())
						.map(comment => (
							<div key={comment.commentId} className={styles.comment}>
								<img src={comment.profileImgUrl} alt="Profile" className={styles.profileImage} />
								<div className={styles.userInfo} style={{ flex: 1 }}>
									<h3 className={styles.username}>{comment.displayName}</h3>
									<span>{comment.content}</span>
								</div>
								<span className={styles.timestamp}>{dayjs(comment.createdDate).fromNow()}</span>
							</div>
						))
				)}

				{!editable && (
					<div className={styles.commentInputWrapper}>
						<TextInput
							className={styles.commentInput}
							placeholder="Say something..."
							name="comment"
							value={comment}
							onChange={e => setComment(e.target.value)}
							onKeyDown={e => e.key === 'Enter' && handleAddComment()}
						/>
						<Button variant="filled" onClick={handleAddComment} style={{ padding: '4px 12px' }}>
							Send
						</Button>
					</div>
				)}
			</div>

			<Modal opened={opened} onClose={close} title="Update Your Post" centered>
				<form onSubmit={handleUpdatePost}>
					<Select
						label="Challenge"
						placeholder="Select a challenge"
						data={challenges.map(c => ({ value: c.challengeId, label: c.title }))}
						onChange={_value => setEditPost({ ...editPost, challenge: _value })}
						value={editPost.challenge}
					/>
					<TextInput
						label="Title"
						description=""
						placeholder="Please enter the title"
						name="title"
						value={editPost.title}
						onChange={handleInputChange}
						mt="md"
					/>
					<TextInput
						label="Image URL"
						description=""
						placeholder="Please enter the image url"
						name="imgUrl"
						value={editPost.imgUrl}
						onChange={handleInputChange}
						mt="md"
					/>
					<Textarea
						label="Content"
						description=""
						placeholder="Please enter the content"
						name="content"
						value={editPost.content}
						onChange={handleInputChange}
						mt="md"
					/>
					<Group justify="flex-end" mt="md">
						<Button type="submit">Submit</Button>
					</Group>
				</form>
			</Modal>

			<Modal opened={openedDialog} onClose={closeDialog} title="Are you sure?" centered>
				<Group justify="flex-end" mt="md">
					<Button variant="outline" type="button" onClick={closeDialog} color="red">
						Cancel
					</Button>
					<Button variant="filled" type="button" onClick={handleDeletePost} color="red">
						Delete
					</Button>
				</Group>
			</Modal>
		</div>
	);
}

export { PostDetail };
