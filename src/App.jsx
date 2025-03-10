import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

// Import URLs
import { Url } from "./constants.js";

// -- Page imports --
import TestPage from "./pages/TestPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

// -- Main page manager for the whole site --

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Link URLS to jsx pages here */}
				<Route path={Url.HOME} element={<HomePage />} />
				<Route path={Url.TEST} element={<TestPage />} />

				{/* Account related */}
				<Route path={Url.LOGIN} element={<LoginPage />} />
				<Route path={Url.PROFILE} element={<ProfilePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
