import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
	Avatar,
	Button,
	Fab,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import ListItem from "@mui/material/ListItemIcon";
import ListItemIcon from "@mui/material/ListItemIcon";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { api } from "../api";
import { ACCESS_TOKEN, Url } from "../constants";
import NewBagDialog from "../components/NewBagDialog";

// Page displaying the user's username and bags
// NOTE: You can only view your own profile currently...

function ProfilePage() {
	// State vars
	const [username, setUsername] = useState("");
	const [userId, setUserId] = useState("");
	const [bags, setBags] = useState([]);

	// Need to do this to use "navigate" function
	const navigate = useNavigate();

	useEffect(() => {
		getUserInfo();
	}, []);

	// Get user information from backend
	const getUserInfo = async () => {
		try {
			// Get the currently authenticated user's name and id
			let res = await api.get(Url.BACKEND_CURRENT_USER);
			setUsername(res.data[0].username);
			setUserId(res.data[0].id);

			// Get the user's bags
			res = await api.get(Url.BACKEND_BAG + "?userId=" + userId);
			setBags(res.data);
		} catch (error) {
			alert(error);
		}
	};

	const addBagClicked = () => {
		// navigate(Url.HOME);
		alert("Does nothing right now");
	};

	// DEBUG create a bunch of dummy bags
	let testBags = [];
	for (let i = 0; i < 100; i++) {
		testBags.push({ title: "Bag #" + i, subtitle: "This is bag #" + i });
	}

	return (
		<div>
			<h1>{username}'s Profile Page</h1>
			<div>
				<h2>{username}'s Bags</h2>
				<NewBagDialog returnUrl={Url.PROFILE} />

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
							<ListItemAvatar>
								<Avatar>
									<ShoppingBagOutlinedIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={bag.title}
								secondary={bag.description}
							/>
							<Button>Delete</Button>
							{/* <Fab
								size="small"
								color="primary"
								// aria-label="add"
							>
								<DeleteOutlinedIcon />
							</Fab> */}
						</ListItemButton>
					))}

					{/* {testBags.map((bag) => (
						<ListItemButton>
							<ListItemAvatar>
								<Avatar>
									<ShoppingBagOutlinedIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={bag.title}
								secondary={bag.subtitle}
							/>
							<Button>Delete</Button>
						</ListItemButton>
					))} */}
				</List>
			</div>
		</div>
	);
}

export default ProfilePage;
