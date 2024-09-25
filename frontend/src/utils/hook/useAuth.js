import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import routePath from 'constants/path';
import { useLocalStorage } from 'utils/hook/useLocalStorage';

const AuthContext = createContext();

function AuthProvider({ children }) {
	const [user, setUser] = useLocalStorage('user', null);
	const navigate = useNavigate();

	// call this function when you want to authenticate the user
	const login = async data => {
		setUser(data);
		navigate(routePath.homepage);
	};

	// call this function to sign out logged in user
	const logout = () => {
		setUser(null);
		navigate(routePath.homepage, { replace: true });
	};

	const value = useMemo(
		() => ({
			user,
			login,
			logout,
		}),
		// eslint-disable-next-line
		[user],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
	return useContext(AuthContext);
}

export { AuthProvider, useAuth };
