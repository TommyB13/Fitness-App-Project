import React, { useEffect } from 'react';
import { usePosts } from 'models/post';

import styles from './styles.module.scss';

function HomeDetail() {
	const [{ targetPost }, { fetchPostDetail }] = usePosts();

	useEffect(() => {
		fetchPostDetail(targetPost.id);
	}, [fetchPostDetail]);

	return <div>{targetPost.heading}</div>;
}








export { HomeDetail };
