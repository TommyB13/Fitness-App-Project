import React, { useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

import routePath from 'constants/path';
import { useRouting } from 'models/routing';

import styles from './styles.module.scss';

function App({ children }) {
	const location = useLocation();
	const [{ pathname }, { routeChange }] = useRouting();

	useEffect(() => {
		routeChange(location);
	}, [location]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div
				className={classnames(styles.wrapper, {
					[styles.welcome]: pathname === routePath.welcome,
				})}
			>
				{children}
			</div>
		</Suspense>
	);
}

export default App;
