import { useState, useEffect, useRef } from 'react';

import styles from './styles.module.scss';

const PullToChange = ({ callback = () => {} }) => {
	const refreshCont = useRef(0);
	const [startPoint, setStartPoint] = useState(0);
	const [pullChange, setPullChange] = useState();

	const initLoading = () => {
		callback();
	};

	const pullStart = e => {
		const { screenY } = e.targetTouches[0];
		setStartPoint(screenY);
	};

	const pull = e => {
		const touch = e.targetTouches[0];
		const { screenY } = touch;
		let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
		setPullChange(pullLength);
		// console.log({ screenY, startPoint, pullLength, pullChange });
	};

	const endPull = () => {
		setStartPoint(0);
		setPullChange(0);
		if (pullChange > 220) initLoading();
	};

	useEffect(() => {
		window.addEventListener('touchstart', pullStart);
		window.addEventListener('touchmove', pull);
		window.addEventListener('touchend', endPull);

		return () => {
			window.removeEventListener('touchstart', pullStart);
			window.removeEventListener('touchmove', pull);
			window.removeEventListener('touchend', endPull);
		};
	});

	return (
		<div ref={refreshCont} className={styles.wrapper} style={{ marginTop: pullChange / 3.118 || '' }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className=""
				style={{ transform: `rotate(${pullChange}deg)` }}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
				/>
			</svg>
		</div>
	);
};

export default PullToChange;
