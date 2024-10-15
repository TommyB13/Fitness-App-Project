import React, { useState } from 'react';

import styles from './styles.module.scss';

function HomePage() {
	const [posts, setPosts] = useState([]);

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
		</div>
	);
}

export { HomePage };
