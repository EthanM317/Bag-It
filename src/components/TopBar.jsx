import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { styled, alpha } from "@mui/material/styles";
import pearLogo from "../assets/bagit.svg";
import { useNavigate } from "react-router";
import { Url } from "../constants";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexShrink: 0,
	borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
	backdropFilter: "blur(24px)",
	border: "1px solid",
	borderColor: (theme.vars || theme).palette.divider,
	backgroundColor: theme.vars
		? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
		: alpha(theme.palette.background.default, 0.4),
	boxShadow: (theme.vars || theme).shadows[1],
	padding: "8px 12px",
}));

/**
 * Main navbar of the site. Contains logo, search bar, and some user-related stuff.
 */
function TopBar({ loggedIn }) {
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);


	function homeClicked(e) {
		navigate(Url.HOME);
	}

	function loginPressed(e) {
		navigate(Url.LOGIN);
	}

	function handleProfileMenu(e) {
		setAnchorEl(e.currentTarget);
	}

	function handleProfileClose() {
		setAnchorEl(null);
	}

	function profilePressed() {
			navigate(Url.PROFILE);
			handleProfileClose();
		}

	return (
		<AppBar
			position="fixed"
			enableColorOnDark
			sx={{
				boxShadow: 0,
				bgcolor: "transparent",
				backgroundImage: "none",
				// animation: "fadeIn 0.3s ease-in-out",

				// TODO: Wtf is this
				mt: "calc(var(--template-frame-height, 0px) + 28px)",
			}}
		>
			<Container maxWidth="lg">
				<StyledToolbar variant="dense" disableGutters>
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							alignItems: "center",
							px: 0,
						}}
					>
						{/* Bag it button */}
						<Button
							onClick={homeClicked}
							disableRipple
							sx={{
								padding: "0px",
								textTransform: "none",
								outline: "none",
							}}
						>
							<Box
								component="img"
								src={pearLogo}
								alt="Peartech Logo"
								sx={{
									width: "30px",
									margin: "5px",
									filter: "drop-shadow(0 0 80px rgba(132, 0, 255, 0.36))",
								}}
							/>
							<Typography
								marginLeft="10px"
								color="text.default"
								fontWeight="bold"
							>
								Bag-It
							</Typography>
						</Button>
					</Box>

					{/* Login button */}
					{loggedIn == false && (
						<Button
							onClick={loginPressed}
							color="text.default"
							variant="text"
						>
							Login
						</Button>
					)}

					{/* Profile button */}
					{loggedIn == true && (
						<Box>
							<IconButton
								// size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleProfileMenu}
								color="inherit"
							>
								<AccountCircleIcon />
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
								<MenuItem onClick={profilePressed}>
									Profile
								</MenuItem>
								<MenuItem onClick={() => navigate(Url.LOGOUT)}>
									Log Out
								</MenuItem>
							</Menu>
						</Box>
					)}
				</StyledToolbar>
			</Container>
		</AppBar>
	);
}

export default TopBar;
