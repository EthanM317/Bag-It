import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

// -- Page imports --
import TestPage from "./pages/TestPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";


// -- Main page manager for the whole site --

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Link URLS to jsx pages here */}
				<Route path="/" element={<HomePage />} />
				<Route path="/test" element={<TestPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
