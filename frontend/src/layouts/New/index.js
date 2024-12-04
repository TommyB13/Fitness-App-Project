import React, { useState, useEffect } from 'react';
import { TextInput, Textarea, Group, Button, Select } from '@mantine/core';

import { usePosts } from 'models/post';
import { useChallenges } from 'models/challenge';

import ImageUploader from 'components/atoms/ImageUploader';

import styles from './styles.module.scss';

function NewPost() {
	const [newPost, setNewPost] = useState({
		title: '',
		challenge: '',
		completed: false,
		content: '',
		imgUrl: '',
		percentage: 0,
	});
	const [, { addPost }] = usePosts();
	const [{ challenges }, { fetchChallenges }] = useChallenges();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setNewPost({ ...newPost, [name]: value });
	};

	const handleAddPost = e => {
		e.preventDefault();
		addPost(newPost);
	};

	const uploadImage = url => {
		setNewPost({ ...newPost, imgUrl: url });
	};

	useEffect(() => {
		fetchChallenges();
		setNewPost({
			title: '',
			challenge: '',
			completed: false,
			content: '',
			imgUrl: '',
			percentage: 0,
		});
	}, []);

	return (
		<div className={styles.newWrapper}>
			<form onSubmit={handleAddPost}>
				<Select
					label="Challenge"
					placeholder="Select a challenge"
					data={challenges.map(c => ({ value: c.challengeId, label: c.title }))}
					onChange={_value => setNewPost({ ...newPost, challenge: _value })}
				/>
				<TextInput
					label="Title"
					description=""
					placeholder="Please enter the title"
					name="title"
					value={newPost.title}
					onChange={handleInputChange}
					mt="md"
					mb="md"
				/>
				{/* <TextInput
					label="Image URL"
					description=""
					placeholder="Please enter the image url"
					name="imgUrl"
					value={newPost.imgUrl}
					onChange={handleInputChange}
					mt="md"
				/> */}
				<ImageUploader type="post" uploadOnChange callback={uploadImage} />
				<Textarea
					label="Content"
					description=""
					placeholder="Please enter the content"
					name="content"
					value={newPost.content}
					onChange={handleInputChange}
					mt="md"
				/>
				<Group justify="flex-end" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</div>
	);
}

export default NewPost;
