import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import theme from "./theme.js";

// Main entry point for the application
// create the "App" component on the page

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<App />
			</CssBaseline>
		</ThemeProvider>
	</React.StrictMode>
);
