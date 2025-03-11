import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
	Avatar,
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
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
	const [username, setUsername] = useState(""); // The username to display on the page
	const [userId, setUserId] = useState(""); // Current userId to use for api calls
	const [bags, setBags] = useState([]); // List of the user's bags
	const [delDialogOpen, setDelDialogOpen] = useState(false); // Whether or not the delete-bag dialog is open
	const [deleteId, setDeleteId] = useState(-1); // The ID of the bag to delete (used by the delete dialog)
	const [isAuthenticated, setIsAuthenticated] = useState(false); // Whether or not the user is signed in (allows you to delete your own bags)
	const [userNotFound, setUserNotFound] = useState(false); // Display error if the user couldn't be found
	const [isLoading, setIsLoading] = useState(true); // Is the page still fetching information from the backend?

	// Param from dynamic route
	const { id } = useParams();

	// Need to do this to use "navigate" function
	const navigate = useNavigate();

	useEffect(() => {
		getUserInfo();
	}, []);

	// Get user information from backend
	const getUserInfo = async () => {
		let userDataStuff;
		let bagData;

		setIsLoading(true);

		// Verify the id from parameter
		if (isNaN(id)) {
			setIsLoading(false);
			setUserNotFound(true);
			return;
		}

		try {
			// Get currently-logged-in user's info and bags from backend
			const userResponse = await api.get(Url.BACKEND_CURRENT_USER);
			userDataStuff = userResponse.data[0];

			// THIS IS SO FUNNY
			if (!id || id != userDataStuff.id)
				throw new Error("Search using id");

			const bagResponse = await api.get(
				Url.BACKEND_BAG + "?userId=" + userDataStuff.id
			);
			bagData = bagResponse.data;

			// Allow us to edit bags on this page
			setIsAuthenticated(true);
		} catch (error) {
			// If we caught an error, the user probably isn't logged in
			// Try using ID from parameters
			if (!id) {
				// Nope, something's just broken
				alert(error);
				setUserNotFound(true);
				return;
			}

			try {
				// Get user info and user's bags from backend using the url parameter id
				const userResponse = await api.get(
					Url.BACKEND_USER + "?userId=" + id
				);
				userDataStuff = userResponse.data[0];

				if (!userDataStuff || userDataStuff.length <= 0) {
					// Couldn't find the user
					setUserNotFound(true);
					return;
				}

				const bagResponse = await api.get(
					Url.BACKEND_BAG + "?userId=" + id
				);
				bagData = bagResponse.data;
			} catch (error) {
				alert(error);
				return;
			}

			// Don't allow us to edit bags on this page
			setIsAuthenticated(false);
		}
		setUsername(userDataStuff.username);
		setUserId(userDataStuff.userId);
		setBags(bagData);

		setIsLoading(false);
	};

	const deleteBag = async () => {
		if (deleteId < 0) {
			alert("Error: Bag ID does not exist.");
			return;
		}

		const res = await api.delete(Url.BACKEND_BAG_DELETE + deleteId);
		console.log(res);

		// Linear search through bags until we find the correct one
		let bag;
		let i = 0;
		for (; i < bags.length; i++) {
			if (bags[i].id == deleteId) {
				bag = bags[i];
				break;
			}
		}

		// Delete the bag at that position in the list
		bags.splice(i);
		setBags(bags);
		closeDeleteDialog();
	};

	// -- The delete dialog --
	const openDeleteDialog = (bagId) => {
		setDeleteId(bagId);
		setDelDialogOpen(true);
	};

	const closeDeleteDialog = () => {
		setDelDialogOpen(false);
		setDeleteId(-1);
	};

	return (
		<div>
			{userNotFound && <h2>Error: User not found</h2>}

			{!isLoading && !userNotFound && (
				<div>
					<h1>{username}'s Profile Page</h1>
					<h2>{username}'s Bags</h2>
					{isAuthenticated && (
						<NewBagDialog reloadFunc={() => getUserInfo()} />
					)}

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
								{/* <Button onClick={() => deleteBag(bag.id)}>
								Delete
							</Button> */}
								{isAuthenticated && (
									<Button
										onClick={() => openDeleteDialog(bag.id)}
									>
										Delete
									</Button>
								)}
							</ListItemButton>
						))}
					</List>
					{isAuthenticated && (
						<Dialog
							open={delDialogOpen}
							onClose={closeDeleteDialog}
						>
							<DialogTitle>Delete Bag</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Are you sure you want to delete this bag?
								</DialogContentText>
								<Button onClick={deleteBag}>Delete it</Button>
								<Button onClick={closeDeleteDialog}>
									Cancel
								</Button>
							</DialogContent>
						</Dialog>
					)}
				</div>
			)}
		</div>
	);
}

export default ProfilePage;
