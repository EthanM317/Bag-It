import { api } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router";

// A login form
// TODO: See if Mui already has one of these

function Form() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
    const [outputMsg, setOutputMsg] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();

		// TODO: Post request to login
		try {
            setOutputMsg("Username: " + username + " Password: " + password);
            console.log(outputMsg);
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="form-container">
			<h1>Login</h1>
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
				Login
			</button>

            {outputMsg && 
            <p>{outputMsg}</p>
            }
		</form>
	);
}

export default Form;
