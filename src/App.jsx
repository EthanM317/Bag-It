import React, { useMemo, useState } from "react";
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
import ProductsTestPage from "./pages/ProductsTestPage.jsx";
import Item from "./pages/Item.jsx";
import BagPage from "./pages/BagPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

import theme from "./theme.js";
import BackendTestPage from "./pages/test/BackendTestPage.jsx";

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
				<Route path="*" element={<NotFoundPage />} />
				<Route path={Url.HOME} element={<LandingPage />} />
				<Route path={Url.ITEM} element={<Item />} />

				{/* Account related */}
				<Route path={Url.LOGIN} element={<LoginPage />} />
				<Route path={Url.LOGOUT} element={<Logout />} />
				<Route path={Url.REGISTER} element={<RegisterPage />} />

				{/* Bag related */}
				<Route path={Url.BAG} element={<BagPage />} />
				<Route path={Url.BAG + "/:bagId"} element={<BagPage />} />

				{/* Feed related */}
				<Route path={Url.FEED} element={<ProductsTestPage />} />
				<Route path={Url.FEED + "/:id"} element={<ProductsTestPage />} />

				{/* "ProtectedRoute" means a page can only be accessed if the user is logged in */}
				<Route
					path={Url.PROFILE}
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route path={Url.PROFILE + "/:id"} element={<ProfilePage />} />

				{/* DEBUG */}
				<Route path={Url.TEST} element={<TestPage />} />
				<Route path={"/backendtest"} element={<BackendTestPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
