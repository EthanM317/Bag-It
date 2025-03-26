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
import {
	createTheme,
	CssBaseline,
	ThemeProvider,
	useMediaQuery,
} from "@mui/material";
import { LandingPage } from "./pages/LandingPage.jsx";

function Logout() {
	// Clear refresh/access token
	localStorage.clear();
	return <Navigate to={Url.LOGIN} />;
}

const theme = createTheme({
	palette: {
		primary: {
			main: "#013e87",
		},
		secondary: {
			main: "#2e74c9",
		},
		// mode: "light",
		mode: "dark",
	},
	typography: {
		h1: {
			fontSize: "3rem",
			fontWeight: 600,
		},
		h2: {
			fontSize: "1.75rem",
			fontWeight: 600,
		},
		h3: {
			fontSize: "1.5rem",
			fontWeight: 600,
		},
	},
});

// -- Main page manager for the whole site --

function App() {
	// const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	// const [darkMode, setDarkMode] = useState(prefersDarkMode);
	// const themeString = (b) => (b ? "dark" : "light");

	// const theme = useMemo(() => {
	// 	createTheme({
	// 		palette: {
	// 			// mode: "light",
	// 			mode: themeString(darkMode),
	// 		},
	// 	});
	// }, [darkMode]);

	// function toggleDarkMode(checked) {
	// 	if (checked === null)
	// 		setDarkMode(prefersDarkMode)
	// 	else
	// 		setDarkMode(checked);
	// }

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<BrowserRouter>
					<Routes>
						{/* Link URLS to jsx pages here */}
						<Route path="*" element={<NotFoundPage />} />
						<Route path={Url.HOME} element={<HomePage />} />
						<Route path={Url.ITEM} element={<Item />} />

						{/* Account related */}
						<Route path={Url.LOGIN} element={<LoginPage />} />
						<Route path={Url.LOGOUT} element={<Logout />} />
						<Route path={Url.REGISTER} element={<RegisterPage />} />

						{/* Bag related */}
						<Route path={Url.BAG} element={<BagPage />} />
						<Route
							path={Url.BAG + "/:bagId"}
							element={<BagPage />}
						/>

						{/* "ProtectedRoute" means a page can only be accessed if the user is logged in */}
						<Route
							path={Url.PROFILE}
							element={
								<ProtectedRoute>
									<ProfilePage />
								</ProtectedRoute>
							}
						/>
						<Route
							path={Url.PROFILE + "/:id"}
							element={<ProfilePage />}
						/>

						{/* DEBUG */}
						<Route path={Url.TEST} element={<TestPage />} />
						<Route
							path={"/products"}
							element={<ProductsTestPage />}
						/>
						<Route
							path={"/products/:id"}
							element={<ProductsTestPage />}
						/>

						<Route path="/landingpage" element={<LandingPage />} />
					</Routes>
				</BrowserRouter>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
