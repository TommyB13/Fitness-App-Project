import React, { useEffect } from 'react';

import { useUserData } from 'models/user';

import styles from './styles.module.scss';

function ProfilePage() {
	const [{ email, email_verified, sub, username }, { getUser }] = useUserData();

	useEffect(() => {
		if (!email) {
			getUser();
		}
	}, []);

	return (
		<div className={styles.profileLayout}>
			<h2>Profile page</h2>
			<ul>
				<li>Email: {email}</li>
				<li>Email_Verified: {email_verified}</li>
				<li>Sub: {sub}</li>
				<li>Username: {username}</li>
			</ul>
		</div>
	);
}

export { ProfilePage };
