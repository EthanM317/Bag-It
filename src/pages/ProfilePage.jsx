import React from "react";
import { useState, useEffect } from "react";

import { api } from "../api";
import { ACCESS_TOKEN } from "../constants";

// Page displaying the user's username and bags
// NOTE: You can only view your own profile currently...

function ProfilePage() {
	const [username, setUsername] = useState("");
	
	useEffect(() => {
		getUserInfo();
	}, []);
	
	// Get user information from backend
	const getUserInfo = async () => {
		try {
			// Get the currently authenticated user
			const res = await api.get("/accounts/users/current/");

			setUsername(res.data[0].username);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div>
			<h1>{username}'s Profile Page</h1>
		</div>
	);
}

export default ProfilePage;
