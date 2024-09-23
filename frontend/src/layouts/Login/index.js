import React, { useState } from 'react';

import { useAuth } from 'utils/hook/useAuth';

import styles from './styles.module.scss';

function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useAuth();

	const handleLogin = async e => {
		e.preventDefault();
		// call backend login api to authenticate user
		if (username === 'user' && password === 'password') {
			// Replace with actual authentication logic
			await login({ username });
		} else {
			alert('Invalid username or password');
		}
	};

	return (
		<div className={styles.loginLayout}>
			<div>
				<form onSubmit={handleLogin}>
					<div>
						<label htmlFor="username">
							Username:
							<input
								id="username"
								type="text"
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</label>
					</div>
					<div>
						<label htmlFor="password">
							Password:
							<input
								id="password"
								type="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</label>
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
}

export { LoginPage };
