import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
	List,
	ListItemButton,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import ListItem from "@mui/material/ListItemIcon";
import ListItemIcon from "@mui/material/ListItemIcon";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

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
		// navigate(Url.HOME);
		alert("Does nothing right now");
	};

	// DEBUG create a bunch of dummy bags
	let bags = [];
	for (let i = 0; i < 100; i++) {
		bags.push({ title: "Bag #" + i, subtitle: "This is bag #" + i });
	}

	return (
		<div>
			<h1>{username}'s Profile Page</h1>
			<div>
				<h2>{username}'s Bags</h2>
				<button onClick={addBagClicked}>+ Add Bag</button>
				<List
					sx={{
						width: "100%",
						maxWidth: 360,
						bgcolor: "background.paper",
					}}
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader
							component="div"
							id="nested-list-subheader"
						>
							Bags
						</ListSubheader>
					}
				>
					{bags.map((bag) => (
						<ListItemButton>
							<ListItemIcon>
								<ShoppingBagOutlinedIcon />
							</ListItemIcon>
							<ListItemText
								primary={bag.title}
								secondary={bag.subtitle}
							/>
						</ListItemButton>
					))}
					{/* <ListItemButton>
						<ListItemIcon>
							<ShoppingBagOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							primary="Bag 1"
							secondary="Your first bag."
						/>
					</ListItemButton>

					<ListItemButton>
						<ListItemIcon>
							<ShoppingBagOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							primary="Bag 1"
							secondary="Your second bag."
						/>
					</ListItemButton> */}
				</List>
			</div>
		</div>
	);
}

export default ProfilePage;
