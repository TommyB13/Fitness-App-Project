import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import history from 'store/history';
import routePath from 'constants/path';
import ProtectedRoute from 'utils/hoc/ProtectedRoute';
import App from 'layouts/App';
import { WelcomePage } from 'layouts/Welcome';
import { HomePage } from 'layouts/Home';
import NewPost from 'layouts/New';
import { ProfilePage } from 'layouts/Profile';
import { PostDetail } from 'layouts/PostDetail';
import ChallengesPage from 'layouts/ChallengesPage';
import ChallengeDetail from 'layouts/ChallengeDetails';
// import { MarketPage } from 'layouts/Market';

import Header from 'components/organisms/Header';
import Navigation from 'components/organisms/Navigation';

function RouterWrapper({ children }) {
	return process.env.NODE_ENV !== 'production' ? (
		<BrowserRouter>{children}</BrowserRouter>
	) : (
		<BrowserRouter history={history} basename={process.env.REACT_APP_PUBLIC_URL}>
			{children}
		</BrowserRouter>
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
					<Route path={routePath.welcome} element={<WelcomePage />} />
					{/* Protected - Needs to login */}
					<Route
						path={routePath.homepage}
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path={`${routePath.post}/:post-id`}
						element={
							<ProtectedRoute>
								<PostDetail />
							</ProtectedRoute>
						}
					/>
					<Route
						path={routePath.new}
						element={
							<ProtectedRoute>
								<NewPost />
							</ProtectedRoute>
						}
					/>
					<Route
						path={routePath.profile}
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path={`${routePath.myPost}/:post-id`}
						element={
							<ProtectedRoute>
								<PostDetail />
							</ProtectedRoute>
						}
					/>
					<Route
						path={routePath.challenge}
						element={
							<ProtectedRoute>
								<ChallengesPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path={`${routePath.challenge}/:challenge-id`}
						element={
							<ProtectedRoute>
								<ChallengeDetail />
							</ProtectedRoute>
						}
					/>
					{/* <Route
						path={routePath.market}
						element={
							<ProtectedRoute>
								<MarketPage />
							</ProtectedRoute>
						}
					/> */}
				</Routes>
			</App>
		</RouterWrapper>
	);
}

export default AppRoutes;
