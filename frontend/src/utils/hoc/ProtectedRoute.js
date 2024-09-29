import React from 'react';
import { Navigate } from 'react-router-dom';

import routePath from 'constants/path';
import { useAuth } from 'models/auth';

function ProtectedRoute({ children }) {
	const [{ isLogin }] = useAuth();

	if (!isLogin) {
		// user is not authenticated
		return <Navigate to={routePath.homepage} />;
	}

	return children;
}

export default ProtectedRoute;
