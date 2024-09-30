import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';

import { useAuth } from 'models/auth';
import { useRouting } from 'models/routing';

import routePath from 'constants/path';

import styles from './styles.module.scss';

function HomePage() {
	const [{ search }, { replaceRoute }] = useRouting();
	const { code } = qs.parse(search, { ignoreQueryPrefix: true });

	const [{ isLogin }, { getIdToken, getAccessToken, logout }] = useAuth();

	async function asyncGetAccessToken() {
		if (code) {
			await getAccessToken(code);
			await replaceRoute({ search: '' });
		}
	}

	useEffect(() => {
		asyncGetAccessToken();
	}, [code]);

	return (
		<div className={styles.homeLayout}>
			<h2>Home</h2>
			<div className={styles.contentWrapper}>
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
			{isLogin && <Link to={routePath.profile}>Profile</Link>}
		</div>
	);
}

export { HomePage };
