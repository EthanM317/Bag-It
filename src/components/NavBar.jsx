import {
	AppBar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import logo from "../assets/pear.png";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ACCESS_TOKEN, Url } from "../constants";
import { api } from "../api";
import { AccountCircle, AirlineSeatFlatAngled } from "@mui/icons-material";

function NavBar() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		getAuthenticated();
	}, []);

	async function getAuthenticated() {
		if (!localStorage.getItem(ACCESS_TOKEN)) {
			setIsAuthenticated(false);
			return;
		}

		// This is a really hacky way to do this
		try {
			await api.get(Url.BACKEND_USER);
		} catch (error) {
			// If this failed, the user probably isn't authenticated
			setIsAuthenticated(false);
			return;
		}

		setIsAuthenticated(true);
	}

	function handleProfileMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleProfileClose() {
		setAnchorEl(null);
	}

	function profilePressed() {
		navigate(Url.PROFILE);
		handleProfileClose();
	}

	function getButtons() {
		if (isAuthenticated) {
			return (
				<>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleProfileMenu}
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorEl)}
						onClose={handleProfileClose}
					>
						<MenuItem onClick={profilePressed}>Profile</MenuItem>
						<MenuItem onClick={() => navigate(Url.LOGOUT)}>
							Log Out
						</MenuItem>
					</Menu>
				</>
			);
		} else {
			return (
				<>
					<Button color="inherit" onClick={() => navigate(Url.LOGIN)}>
						Login
					</Button>
				</>
			);
		}
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" elevation={5}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						{/* TODO Replace with actual Bagit csv */}
						{/* <img className="logo" alt="Logo" src={logo} /> */}
						<HomeIcon onClick={() => navigate(Url.HOME)} />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Bag It
					</Typography>
					{getButtons()}
				</Toolbar>
			</AppBar>
			<AppBar position="static" elevation={0}>
				<Toolbar />
			</AppBar>
		</Box>
	);
}

export default NavBar;
