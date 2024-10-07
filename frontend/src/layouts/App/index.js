import React, { useState, useEffect, Suspense } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import { useRouting } from 'models/routing';
import HomePage from 'layouts/Home';
import NewPost from 'layouts/New';
import styles from './styles.module.scss';

function App() {
	const location = useLocation();
	const [, { routeChange }] = useRouting();

	// State to hold the list of posts
	const [posts, setPosts] = useState([]);

	// Function to add a new post
	const addPost = post => { // Removed parentheses around single argument
		setPosts([...posts, post]);
	};

	useEffect(() => {
		routeChange(location);
	}, [location]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className={styles.wrapper}>
				<Routes>
					{/* Pass the posts to HomePage */}
					<Route path="/" element={<HomePage posts={posts} />} />
					{/* Pass the addPost function to NewPost */}
					<Route path="/new" element={<NewPost addPost={addPost} />} />
				</Routes>
			</div>
		</Suspense>
	);
}

export default App;
