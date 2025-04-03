import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Item.css";
import TopPanelBar from "../components/TopPanelBar";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Box,
	Container,
	List,
	ListSubheader,
	ListItemButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
} from "@mui/material";
import TopBar from "../components/TopBar";
import TopContainer from "../components/TopContainer";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Backend } from "../api";

function ExistingBagList({bags, product}) {
	const [isLoading, setIsLoading] = useState(false);

	async function addToExisting(e, bag) {
		setIsLoading(true);
		
		await Backend.addItem(product.id, bag.id);
		setIsLoading(false);
		
		// console.log("Added " + product.name + " to " + bag.title);
	}

	return (
		<List
			sx={{
				width: "100%",
				maxWidth: 360,
				bgcolor: "background.paper",
			}}
			component="nav"
			// aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Bags
				</ListSubheader>
			}
		>
			{bags.map((bag) => (
				<ListItemButton disableRipple={true}>
					<ListItemAvatar>
						<Avatar>
							<ShoppingBagOutlinedIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={bag.title}
						secondary={bag.description}
					/>

					{/* Add button */}
					<Button
						variant="contained"
						color="primary"
						onClick={(e) => addToExisting(e, bag)}
						loading={isLoading}
					>
						Add
					</Button>
				</ListItemButton>
			))}
		</List>
	);
}

export default function Item() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);
	const [bags, setBags] = useState([]);

	const location = useLocation();
	const navigate = useNavigate();
	const product = location.state;
	const [openExistingDialog, setOpenExistingDialog] = useState(false);
	const [openNewDialog, setOpenNewDialog] = useState(false);

	// Redirect if no product data is found
	if (!product) {
		navigate("/products");
		return null;
	}

	useEffect(() => {
		const effect = async () => {
			// See if user is logged in
			let user = await Backend.getCurrentUser();

			if (user == null)
			{
				setLoggedIn(false);
				return;
			}
			setLoggedIn(true);

			// If so, get bags
			let tempBags = [];
			tempBags = await Backend.getUsersBags(user.id);

			setBags(tempBags);
		};
		effect();
	}, []);

	function openDialog() {
		// console.log("Opened");
		setLoading(false);
	}

	function addExistingBagPressed(e) {
		openDialog();
		setOpenExistingDialog(true);
	}

	function confirmExistingBagPressed(e) {
		setOpenExistingDialog(false);
	}

	function addNewBagPressed(e) {
		openDialog();
		setOpenNewDialog(true);
	}

	function confirmNewBagPressed(e) {
		setOpenNewDialog(false);
	}

	return (
		<Box>
			<TopContainer>
				<TopBar />
				<Container maxWidth="lg">
					<div className="ItemContainer">
						{product.image ? (
							<img
								src={product.image}
								alt={product.name}
								className="Image"
							/>
						) : (
							<p>No image available</p>
						)}

						<div className="ItemInfo">
							<h1 className="Name">
								{product.name || "Unknown Product"}
							</h1>
							<p className="description">
								{product.description ||
									"No description available."}
							</p>
						</div>

						<div className="tagList">
							<h2 className="tag">
								Size:{" "}
								{{
									0: "Extra Small",
									1: "Small",
									2: "Medium",
									3: "Large",
									4: "Extra Large",
								}[product.size] || "N/A"}
							</h2>
							<h2 className="tag">
								Type:{" "}
								{{
									0: "Shorts",
									1: "Pants",
									2: "T-Shirt",
									3: "Dress",
									4: "Shoes",
									5: "Hat",
									6: "Hoodie",
									7: "Shirt",
								}[product.type] || "N/A"}
							</h2>
							<h2 className="tag">
								Colour: {product.color || "N/A"}
							</h2>
							<h2 className="tag">
								Gender:{" "}
								{{ 0: "Male", 1: "Female", 2: "Unisex" }[
									product.gender
								] || "N/A"}
							</h2>
							<h2 className="tag">
								Brand: {product.brand || "N/A"}
							</h2>
						</div>
						<p>Item ID: {product.id}</p>

						{loggedIn && (
							<div className="addButtons">
								<div className="existing">
									<Button
										className="addToExistingButton"
										variant="contained"
										onClick={addExistingBagPressed}
									>
										Add Me to Existing Bag!
									</Button>

									{/* Existing bag dialog */}
									<Dialog
										open={openExistingDialog}
										onClose={() =>
											setOpenExistingDialog(false)
										}
									>
										<DialogTitle>Select a Bag</DialogTitle>
										<DialogContent>
											<p>
												Here you can select an existing
												bag to add this product to.
											</p>
											<ExistingBagList bags={bags} product={product} />
										</DialogContent>
										<DialogActions>
											<Button
												loading={loading}
												onClick={() =>
													setOpenExistingDialog(false)
												}
											>
												Cancel
											</Button>
											{/* <Button
												loading={loading}
												onClick={
													confirmExistingBagPressed
												}
												variant="contained"
											>
												Confirm
											</Button> */}
										</DialogActions>
									</Dialog>
								</div>

								<div className="new">
									<Button
										className="addToNewButton"
										variant="contained"
										onClick={addNewBagPressed}
									>
										Add Me to New Bag!
									</Button>

									{/* New bag dialog */}
									<Dialog
										open={openNewDialog}
										onClose={() => {
											setOpenNewDialog(false);
										}}
									>
										<DialogTitle>
											Create a New Bag
										</DialogTitle>
										<DialogContent>
											<p>
												Here you can create a new bag to
												add this product to.
											</p>
										</DialogContent>
										<DialogActions>
											<Button
												loading={loading}
												onClick={() => {
													setOpenNewDialog(false);
												}}
											>
												Cancel
											</Button>
											{/* <Button
												loading={loading}
												onClick={confirmNewBagPressed}
												variant="contained"
											>
												Confirm
											</Button> */}
										</DialogActions>
									</Dialog>
								</div>
							</div>
						)}
					</div>
				</Container>
			</TopContainer>
		</Box>
	);
}
