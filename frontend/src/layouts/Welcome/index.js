import React, { useEffect } from 'react';
import qs from 'qs';

import { useAuth } from 'models/auth';
import { useRouting } from 'models/routing';
import { ReactComponent as Logo } from 'images/logo/logo.svg';

import styles from './styles.module.scss';

function WelcomePage() {
	const [{ search }] = useRouting();
	const { code } = qs.parse(search, { ignoreQueryPrefix: true });
	const [, { getIdToken, getAccessToken }] = useAuth();

	useEffect(() => {
		if (code) {
			getAccessToken(code);
		}
	}, [code]);

	return (
		<div className={styles.welcomeLayout}>
			<div className={styles.logoWrapper}>
				<Logo className={styles.logo} />
				<h1>Fitness App</h1>
			</div>
			<button className={styles.ctaBtn} type="button" onClick={getIdToken}>
				Let's go
			</button>
		</div>
	);
}

export { WelcomePage };
