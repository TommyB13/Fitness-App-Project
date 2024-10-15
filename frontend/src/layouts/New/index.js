import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

import styles from './styles.module.scss';

function NewPost({ addPost }) {
	const [newPost, setNewPost] = useState({ image: '', title: '', description: '' });
	const navigate = useNavigate(); // Use useNavigate

	const handleInputChange = e => {
		const { name, value } = e.target;
		setNewPost({ ...newPost, [name]: value });
	};

	const handleAddPost = e => {
		e.preventDefault();
		const { image, title, description } = newPost;

		if (!image || !title || !description) {
			alert('Please fill out all fields before adding the post.');
			return;
		}

		addPost(newPost);
		setNewPost({ image: '', title: '', description: '' });
		navigate('/'); // Use navigate instead of history.push
	};

	return (
		<div className={styles.newPostContainer}>
			<form className={styles.newPostForm} onSubmit={handleAddPost}>
				<div className={styles.newPostHeader}>
					<img src="path_to_profile_image.jpg" alt="Profile" className={styles.profileImage} />
				</div>
				<input
					type="text"
					name="title"
					placeholder="Title"
					value={newPost.title}
					onChange={handleInputChange}
					className={styles.input}
				/>
				<input
					type="text"
					name="image"
					placeholder="Image URL"
					value={newPost.image}
					onChange={handleInputChange}
					className={styles.input}
				/>
				<textarea
					name="description"
					placeholder="What's on your mind?"
					value={newPost.description}
					onChange={handleInputChange}
					className={styles.textarea}
				/>
				<button type="submit" className={styles.button}>
					Add Post
				</button>
			</form>
		</div>
	);
}

export { NewPost };
