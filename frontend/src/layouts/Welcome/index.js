import React, { useEffect } from 'react';
import qs from 'qs';

import { useAuth } from 'models/auth';
import { useRouting } from 'models/routing';

import styles from './styles.module.scss';

function WelcomePage() {
	const [{ search }] = useRouting();
	const { code } = qs.parse(search, { ignoreQueryPrefix: true });
	const [, { getIdToken, getAccessToken }] = useAuth();

	async function asyncGetAccessToken() {
		if (code) {
			await getAccessToken(code);
		}
	}

	useEffect(() => {
		asyncGetAccessToken();
	}, [code]);

	return (
		<div className={styles.welcomeLayout}>
			<button type="button" onClick={getIdToken}>
				Login
			</button>
		</div>
	);
}

export { WelcomePage };
