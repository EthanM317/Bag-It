import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, TextField } from "@mui/material";

import { ACCESS_TOKEN, REFRESH_TOKEN, Url } from "../constants";
import { api } from "../api";

// A login form
// TODO: See if Mui already has one of these

// route: backend url to make the post request to on submit
// register: whether we're registering (true), or just logging in (false)
function Form({ route, register }) {
	// State vars
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [outputMsg, setOutputMsg] = useState("");

	const formTitle = register ? "Register" : "Login";

	// Setup navigate function
	const navigate = useNavigate();

	useEffect(() => {
		checkToken();
	}, []);

	// Check if the user is already logged in
	async function checkToken() {
		let refreshToken = localStorage.getItem(REFRESH_TOKEN);

		// If we don't have a refresh token, don't do anything
		if (!refreshToken) return;

		try {
			// Check if this is a valid refresh token
			const res = await api.post(Url.BACKEND_TOKEN_REFRESH, {
				refresh: refreshToken,
			});

			// If user is already logged in, just go to profile
			if (res.data) {
				navigate(Url.PROFILE);
			}
		} catch (error) {
			// TODO: Check what happens if the refresh token is invalid
			// it'll probably do this here
			// alert(
			// 	"Warning: if you're seeing this your access token is prolly invalid.\nPlease take a screenshot of the next error and send it to me."
			// );
			// alert(error);

			// DEBUG clear local storage for now
			alert("Token invalid, clearing local storage...");
			localStorage.clear();
		}
	}

	// Called when the user presses the button
	async function handleSubmit(e) {
		// TODO: Figure out what this means
		e.preventDefault();

		try {
			// Make post request
			let res = await api.post(route, { username, password });

			if (register) {
				// If registering, we need to send another request to log in
				res = await api.post(Url.BACKEND_TOKEN, { username, password });
			}

			// Get token
			localStorage.setItem(ACCESS_TOKEN, res.data.access);
			localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

			// Go to profile after logging in
			navigate(Url.PROFILE);
		} catch (error) {
			alert(error);
		} finally {
		}
	}

	return (
		<div>
			{!register && (
				<p>
					Don't have an account?{" "}
					<a
						href=""
						onClick={() => {
							navigate(Url.REGISTER);
						}}
					>
						Sign up here.
					</a>
				</p>
			)}
			<TextField
				label="Username"
				onChange={(e) => setUsername(e.target.value)}
			></TextField>
			<TextField
				type="password"
				label="Password"
				onChange={(e) => setPassword(e.target.value)}
			></TextField>
			<Button variant="contained" onClick={handleSubmit}>
				{formTitle}
			</Button>
		</div>
	);
}

export default Form;
