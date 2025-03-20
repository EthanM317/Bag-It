import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

import "../styles/Home.css";
import TopPanelBar from "../components/TopPanelBar.jsx";
import Title from "../components/Title.jsx";
import NavBar from "../components/NavBar.jsx";
import { Url } from "../constants.js";

function HomePage() {
	const navigate = useNavigate();

	function loginPressed() {
		navigate(Url.LOGIN);
	}

	function registerPressed() {
		navigate(Url.REGISTER);
	}

	return (
		<>
			{/* <TopPanelBar /> */}
			<NavBar></NavBar>
			<div className="big-stuff">
				<Title />

				{/* TODO: Fix all this weird inline styling */}
				<div
					style={{
						textAlign: "center",
					}}
				>
					<Button variant="contained" onClick={loginPressed}>
						Login
					</Button>
					<Button variant="contained" onClick={registerPressed}>
						Register
					</Button>
				</div>
			</div>
		</>
	);
}

export default HomePage;
