import React from 'react';
import { Navigate } from 'react-router-dom';

import routePath from 'constants/path';
import { useAuth } from 'utils/hook/useAuth';

function ProtectedRoute({ children }) {
	const { user } = useAuth();

	if (!user) {
		// user is not authenticated
		return <Navigate to={routePath.login} />;
	}

	return children;
}

export default ProtectedRoute;
