import React from 'react';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';

import history from 'store/history';
import App from 'layouts/App';
import routePath from 'constants/path';
import ProtectedRoute from 'utils/hoc/ProtectedRoute';

import { HomePage } from 'layouts/Home';
import { ProfilePage } from 'layouts/Profile';

import Header from 'components/organisms/Header';

function RouterWrapper({ children }) {
	return process.env.NODE_ENV !== 'production' ? (
		<BrowserRouter>{children}</BrowserRouter>
	) : (
		<HashRouter history={history} basename={process.env.REACT_APP_PUBLIC_URL}>
			{children}
		</HashRouter>
	);
}

function AppRoutes() {
	return (
		<RouterWrapper>
			<App>
				{/* Navbar */}
				<Header />

				{/* Routes */}
				<Routes>
					{/* Non-protected - Anyone has access */}
					<Route path={routePath.homepage} element={<HomePage />} />

					{/* Protected - Needs to login */}
					<Route
						path={routePath.profile}
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</App>
		</RouterWrapper>
	);
}

export default AppRoutes;
