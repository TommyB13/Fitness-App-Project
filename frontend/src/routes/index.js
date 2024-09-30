import React from 'react';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';

import history from 'store/history';
import routePath from 'constants/path';
import ProtectedRoute from 'utils/hoc/ProtectedRoute';
import App from 'layouts/App';
import { HomePage } from 'layouts/Home';
import { ProfilePage } from 'layouts/Profile';

import Header from 'components/organisms/Header';
import Navigation from 'components/organisms/Navigation';

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
				<Navigation />

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
