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
		// DEBUG print what's in the localStorage so I can see the keys
		console.log(localStorage);
	}, []);

	// Called when the user presses the button
	const handleSubmit = async (e) => {
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
	};

	return <div>
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
		<TextField label="Username" onChange={(e) => setUsername(e.target.value)}></TextField>
		<TextField type="password" label="Password" onChange={(e) => setPassword(e.target.value)}></TextField>
		<Button variant="contained" onClick={handleSubmit}>{formTitle}</Button>
	</div>

	return (
		<form onSubmit={handleSubmit} className="form-container">
			<h1>{formTitle}</h1>
			<input
				className="form-input"
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>

			<input
				className="form-input"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
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

			<button className="form-button" type="submit">
				{formTitle}
			</button>
			{outputMsg && <p>{outputMsg}</p>}
		</form>
	);
}

export default Form;
