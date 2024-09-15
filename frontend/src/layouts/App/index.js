import React, { Suspense } from 'react';

import styles from './styles.module.scss';

function App({ children }) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className={styles.wrapper}>{children}</div>
		</Suspense>
	);
}

export default App;
