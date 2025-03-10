
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { api } from "../api";
import { ACCESS_TOKEN, Url } from "../constants";

// Page displaying the user's username and bags
// NOTE: You can only view your own profile currently...

function ProfilePage() {
	// State vars
	const [username, setUsername] = useState("");
	
	// Need to do this to use "navigate" function
	const navigate = useNavigate();
	
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

	const addBagClicked = () => {
		navigate(Url.HOME);
	}

	return (
		<div>
			<h1>{username}'s Profile Page</h1>
			<div>
				<h2>{username}'s Bags</h2>
				<button onClick={addBagClicked}>+ Add Bag</button>
				{
					// Create the list of bags here
				}
			</div>
		</div>
	);
}

export default ProfilePage;
