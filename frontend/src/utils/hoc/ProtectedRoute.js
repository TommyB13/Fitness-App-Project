import React from 'react';
import { Navigate } from 'react-router-dom';

import routePath from 'constants/path';
import { useAuth } from 'models/auth';

function ProtectedRoute({ children }) {
	const [{ isLogin }] = useAuth();

	if (!isLogin) {
		// user is not authenticated
		return <Navigate to={routePath.welcome} />;
	}

	return children;
}

export default ProtectedRoute;
