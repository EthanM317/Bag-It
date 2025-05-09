import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
	Autocomplete,
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";

import { api } from "../api";
import { Url } from "../constants";
import BagList from "../components/Bags/BagList";
import AddBagDialog from "../components/Bags/AddBagDialog";
import TopPanelBar from "../components/TopPanelBar";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import TopContainer from "../components/TopContainer";
import Footer from "../components/Footer";

// Page displaying the user's username and bags

function ProfilePage() {
	// State vars
	const [username, setUsername] = useState(""); // The username to display on the page
	const [userId, setUserId] = useState(""); // Current userId to use for api calls
	const [isAuthenticated, setIsAuthenticated] = useState(false); // Whether or not the user is signed in (allows you to delete your own bags)
	const [userNotFound, setUserNotFound] = useState(false); // Display error if the user couldn't be found
	const [isLoading, setIsLoading] = useState(true); // Is the page still fetching information from the backend?

	const [bags, setBags] = useState([]); // List of the user's bags
	const [delDialogOpen, setDelDialogOpen] = useState(false); // Whether or not the delete-bag dialog is open
	const [deleteId, setDeleteId] = useState(-1); // The ID of the bag to delete (used by the delete dialog)

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
		if (id && isNaN(id)) {
			setIsLoading(false);
			setUserNotFound(true);
			return;
		}

		try {
			// Get currently-logged-in user's info and bags from backend
			const userResponse = await api.get(Url.BACKEND_CURRENT_USER);
			userDataStuff = userResponse.data[0];

			// THIS IS SO FUNNY
			if (id && id != userDataStuff.id)
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

	// const newBag = async (newBagName, newBagDesc) => {
	// 	try {
	// 		const res = await api.post(Url.BACKEND_BAG_CREATE, {
	// 			title: newBagName,
	// 			description: newBagDesc,
	// 		});

	// 		// Update local bags value
	// 		// NOTE: we need to work on a deep copy of the array, otherwise nothing works
	// 		let temp = structuredClone(bags);
	// 		temp.push(res.data);
	// 		setBags(temp);

	// 		console.log(temp);
	// 		console.log(bags);
	// 	} catch (error) {
	// 		alert(error);
	// 	}
	// };

	const deleteBag = async (e) => {
		if (deleteId < 0) {
			alert("Error: Bag ID does not exist.");
			return;
		}

		const res = await api.delete(Url.BACKEND_BAG_DELETE + deleteId);

		let temp = bags;
		let deleteIndex = -1;
		for (let i = 0; i < temp.length; i++) {
			// Linear search through this user's bags until we find the one
			if (temp[i].id == deleteId) {
				deleteIndex = i;
				break;
			}
		}

		// Bag couldn't be found
		if (deleteIndex < 0) return;

		// Delete the bag at that position in the list
		temp.splice(deleteIndex, 1);
		setBags(temp);
		closeDeleteDialog();
	};

	// -- The delete dialog --
	const openDeleteDialog = (e, bagId) => {
		// Don't let us click buttons underneath this one
		e.stopPropagation();

		setDeleteId(bagId);
		setDelDialogOpen(true);
	};

	const closeDeleteDialog = () => {
		setDelDialogOpen(false);
		setDeleteId(-1);
	};

	function logoutClicked() {
		navigate(Url.LOGOUT);
	}

	return (
		<Box>
			<TopContainer>
				<Container sx={{ marginTop: "120px" }}>
					{/* <NavBar /> */}
					<TopBar />
					<div className="main-container">
						{/* <TopPanelBar /> */}
						{userNotFound && <h2>Error: User not found</h2>}

						{!isLoading && !userNotFound && (
							<Box
								sx={{
									animation: "fadeIn 0.2s ease-in-out",
								}}
							>
								{/* <Button variant="contained" onClick={logoutClicked}>
							Logout
						</Button> */}

								<h1>{username}'s Profile</h1>
								<h2>{username}'s Bags</h2>

								{/* Add Bag button and dialog */}
								{isAuthenticated && (
									<AddBagDialog
										bags={bags}
										setBags={setBags}
									/>
								)}

								{/* Search bar for bag list */}
								<br />
								<br />
								{/* <Autocomplete
									// Use all the bag titles as keywords in the autocomplete search
									options={bags.map((bag) => {
										return bag.title;
									})}
									sx={{ width: 300 }}
									renderInput={(params) => (
										<TextField {...params} label="Bag" />
									)}
								/> */}

								{/* Bag list */}
								<BagList
									bags={bags}
									isAuthenticated={isAuthenticated}
									openDeleteDialog={openDeleteDialog}
								/>

								{isAuthenticated && (
									<Dialog
										open={delDialogOpen}
										onClose={closeDeleteDialog}
									>
										<DialogTitle>Delete Bag</DialogTitle>
										<DialogContent>
											<DialogContentText>
												Are you sure you want to delete
												this bag?
											</DialogContentText>
											<DialogContentText
												sx={{
													fontSize: 13,
													marginTop: "10px",
												}}
											>
												It will be gone forever...
											</DialogContentText>
										</DialogContent>
										<DialogActions>
											<Button
												variant="outlined"
												onClick={closeDeleteDialog}
											>
												Cancel
											</Button>
											<Button
												variant="contained"
												color="secondary"
												onClick={deleteBag}
											>
												Delete it
											</Button>
										</DialogActions>
									</Dialog>
								)}
							</Box>
						)}
					</div>
				</Container>
			</TopContainer>
			<Box >
				<Footer />
			</Box>
		</Box>
	);
}

export default ProfilePage;
