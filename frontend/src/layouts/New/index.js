import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from 'models/post';

function NewPost() {
	const [newPost, setNewPost] = useState({ image: '', title: '', description: '' });
	const [, { addPost }] = usePosts();
	const navigate = useNavigate();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setNewPost({ ...newPost, [name]: value });
	};

	const handleAddPost = async e => {
		e.preventDefault();
		await addPost(newPost);
		setNewPost({ image: '', title: '', description: '' });
		navigate('/home');
	};

	return (
		<form onSubmit={handleAddPost}>
			<input
				type="text"
				name="title"
				placeholder="Title"
				value={newPost.title}
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="image"
				placeholder="Image URL"
				value={newPost.image}
				onChange={handleInputChange}
			/>
			<textarea
				name="description"
				placeholder="Description"
				value={newPost.description}
				onChange={handleInputChange}
			/>
			<button type="submit">Add Post</button>
		</form>
	);
}

export default NewPost;
