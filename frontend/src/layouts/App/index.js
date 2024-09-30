import React, { useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import { useRouting } from 'models/routing';

import styles from './styles.module.scss';

function App({ children }) {
	const location = useLocation();
	const [, { routeChange }] = useRouting();

	useEffect(() => {
		routeChange(location);
	}, [location]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className={styles.wrapper}>{children}</div>
		</Suspense>
	);
}

export default App;
