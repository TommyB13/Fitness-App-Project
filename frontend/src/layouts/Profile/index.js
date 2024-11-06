import React, { useEffect } from 'react';

import { useAuth } from 'models/auth';
import { useUserData } from 'models/user';

import styles from './styles.module.scss';

function ProfilePage() {
	const [{ displayName, imageUrl, createdDate, userId, points, challenges, consecutiveDays, firstLogin, name }, { getUser }] = useUserData();
	const [, { logout }] = useAuth();

	useEffect(() => {
		if (!userId) {
			getUser();
		}
	}, []);

	return (
		<div className={styles.profileLayout}>
			<h2>Profile page</h2>
			<ul>
				<li>Name: {displayName}</li>
				<li>Points: {points}</li>
				<li>Consecutive Days: {consecutiveDays}</li>
			</ul>
			<img src={imageUrl} alt="avatar" />
			<button type="button" onClick={logout}>
				Logout
			</button>
		</div>
	);
}

export { ProfilePage };
