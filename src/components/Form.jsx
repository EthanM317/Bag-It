import { api } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

// A login form
// TODO: See if Mui already has one of these

// route: backend url to make the post request to on submit
// register: whether we're registering (true), or just logging in (false)
function Form({ route, register }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [outputMsg, setOutputMsg] = useState("");

	const navigate = useNavigate();
	const formTitle = register ? "Register" : "Login";

	const handleSubmit = async (e) => {
		// TODO: Figure out what this means
		e.preventDefault();

		try {
			// Make post request
			const res = await api.post(route, { username, password });

			if (register) {
				localStorage.setItem(ACCESS_TOKEN, res.data.access);
				localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
			}

			setOutputMsg("Username: " + username + " Password: " + password);
			console.log(outputMsg);
		} catch (error) {
			alert(error);
		} finally {
		}
	};

	useEffect(() => {
		// DEBUG print what's in the localStorage so I can see the keys
		console.log(localStorage);
	}, []);


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
			<button className="form-button" type="submit">
				{formTitle}
			</button>

			{outputMsg && <p>{outputMsg}</p>}
		</form>
	);
}

export default Form;
