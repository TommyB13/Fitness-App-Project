import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { useRouting } from 'models/routing';
import routePath from 'constants/path';
import { ReactComponent as HomeIcon } from 'images/icon/Home.svg';
import { ReactComponent as ChallengeIcon } from 'images/icon/Challenge.svg';
import { ReactComponent as NewIcon } from 'images/icon/New.svg';
import { ReactComponent as MarketIcon } from 'images/icon/Market.svg';
import { ReactComponent as ProfileIcon } from 'images/icon/Profile.svg';

import styles from './styles.module.scss';

function Navigation() {
	const [{ pathname }] = useRouting();
	const [currentPathname, setCurrentPathname] = useState(pathname);

	useEffect(() => {
		setCurrentPathname(pathname);
	}, [pathname]);

	const navList = [
		{
			title: 'Home',
			link: routePath.homepage,
			icon: HomeIcon,
			isActive: currentPathname === '' || currentPathname === '/',
		},
		{
			title: 'Challenge',
			link: routePath.challenge,
			icon: ChallengeIcon,
			isActive: currentPathname.includes('/challenge'),
		},
		{
			title: 'New',
			link: routePath.new,
			icon: NewIcon,
			isActive: currentPathname.includes('/new'),
		},
		{
			title: 'Market',
			link: routePath.market,
			icon: MarketIcon,
			isActive: currentPathname.includes('/market'),
		},
		{
			title: 'Profile',
			link: routePath.profile,
			icon: ProfileIcon,
			isActive: currentPathname.includes('/profile'),
		},
	];

	return (
		<div className={styles.wrapper}>
			<ul>
				{navList.map(({ title, link, icon: Icon, isActive }) => (
					<li key={title}>
						<Link to={link} className={classnames(styles.navItem, { [styles.active]: isActive })}>
							<Icon />
							<p>{title}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Navigation;
