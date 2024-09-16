import React from 'react';
import { Navigate } from 'react-router-dom';

import routePath from 'constants/path';

function ProtectedRoute({ children }) {
	const user = null;

	if (!user) {
		// user is not authenticated
		return <Navigate to={routePath.login} />;
	}

	return children;
}

export default ProtectedRoute;
