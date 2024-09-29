import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';

import { useAuth } from 'models/auth';
import { useRouting } from 'models/routing';

import routePath from 'constants/path';

import styles from './styles.module.scss';

function HomePage() {
	const [{ search }] = useRouting();
	const { code } = qs.parse(search, { ignoreQueryPrefix: true });

	const [{ isLogin }, { getIdToken, getAccessToken, logout }] = useAuth();

	useEffect(() => {
		if (code) {
			getAccessToken(code);
		}
	}, [code]);

	return (
		<div className={styles.homeLayout}>
			Home
			<div>
				{isLogin ? (
					<button type="button" onClick={logout}>
						Logout
					</button>
				) : (
					<button type="button" onClick={getIdToken}>
						Login
					</button>
				)}
			</div>
			<Link to={routePath.profile}>Profile</Link>
		</div>
	);
}

export { HomePage };
