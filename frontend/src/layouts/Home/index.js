import React from 'react';
import { Link } from 'react-router-dom';

import routePath from 'constants/path';
import { useAuth } from 'utils/hook/useAuth';

import styles from './styles.module.scss';

function HomePage() {
	const { user, logout } = useAuth();
	const link =
		'https://fitness-app.auth.us-east-2.amazoncognito.com/login?client_id=16kuomlumcb7u5nc7rqporf31j&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Flocalhost%3A3000';

	return (
		<div className={styles.homeLayout}>
			Home
			<div>
				{user ? (
					<button type="button" onClick={logout}>
						Logout
					</button>
				) : (
					<Link to={link}>Login</Link>
				)}
			</div>
			<Link to={routePath.profile}>Profile</Link>
		</div>
	);
}

export { HomePage };
