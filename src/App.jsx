import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

// Import URLs
import { Url } from "./constants.js";

// -- Page imports --
import TestPage from "./pages/TestPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function Logout() {
	// Clear refresh/access token
	localStorage.clear();
	return <Navigate to={Url.LOGIN} />;
}

// -- Main page manager for the whole site --

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Link URLS to jsx pages here */}
				<Route path="*" element={<NotFoundPage />}/>
				<Route path={Url.HOME} element={<HomePage />} />
				<Route path={Url.TEST} element={<TestPage />} />

				{/* Account related */}
				<Route path={Url.LOGIN} element={<LoginPage />} />
				<Route path={Url.LOGOUT} element={<Logout />} />
				<Route path={Url.REGISTER} element={<RegisterPage />} />

				{/* The Profile page can only be accessed by a user that's logged in right now */}
				<Route
					path={Url.PROFILE}
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
