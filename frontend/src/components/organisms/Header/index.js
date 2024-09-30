import React from 'react';
import { Link } from 'react-router-dom';

import routePath from 'constants/path';

import styles from './styles.module.scss';

function Header() {
	return (
		<div className={styles.wrapper}>
			<h1>
				<Link to={routePath.homepage}>Fitness App</Link>
			</h1>
		</div>
	);
}

export default Header;
