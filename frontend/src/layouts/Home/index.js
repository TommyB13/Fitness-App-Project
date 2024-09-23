import React from 'react';
import { Link } from 'react-router-dom';

import routePath from 'constants/path';
import { useAuth } from 'utils/hook/useAuth';

import styles from './styles.module.scss';

function HomePage() {
	const { user, logout } = useAuth();

	return (
		<div className={styles.homeLayout}>
			Home
			<div>
				{user ? (
					<button type="button" onClick={logout}>
						Logout
					</button>
				) : (
					<Link to={routePath.login}>Login</Link>
				)}
			</div>
			<Link to={routePath.profile}>Profile</Link>
		</div>
	);
}

export { HomePage };
