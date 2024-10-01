import React from 'react';
import { Link } from 'react-router-dom';

import routePath from 'constants/path';
import { ReactComponent as Logo } from 'images/logo/logo.svg';

import styles from './styles.module.scss';

function Header() {
	return (
		<div className={styles.wrapper}>
			<Link to={routePath.homepage}>
				<Logo />
			</Link>
		</div>
	);
}

export default Header;
