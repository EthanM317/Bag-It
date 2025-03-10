import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

// -- Page imports --
import TestPage from "./pages/TestPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

// Routing URL constants
export const URL_HOME = "/"
export const URL_TEST = "/test"
export const URL_LOGIN = "/login"
export const URL_PROFILE = "/profile"


// -- Main page manager for the whole site --
function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Link URLS to jsx pages here */}
				<Route path={URL_HOME} element={<HomePage />} />
				<Route path={URL_TEST} element={<TestPage />} />

				{/* Account related */}
				<Route path={URL_LOGIN} element={<LoginPage />} />
				<Route path={URL_PROFILE} element={<ProfilePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
