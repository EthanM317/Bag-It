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
import ProductsTestPage from "./pages/ProductsTestPage.jsx";


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

				{/* Account related */}
				<Route path={Url.LOGIN} element={<LoginPage />} />
				<Route path={Url.LOGOUT} element={<Logout />} />
				<Route path={Url.REGISTER} element={<RegisterPage />} />

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
				<Route path={"/products"} element={<ProductsTestPage />} />
				<Route path={"/products/:id"} element={<ProductsTestPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
