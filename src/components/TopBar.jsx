import {
	AppBar,
	Box,
	Button,
	Container,
	Toolbar,
	Typography,
} from "@mui/material";
import React from "react";

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
function TopBar(loggedIn) {
	const navigate = useNavigate();

	function homeClicked(e) {
		navigate(Url.HOME);
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
					{loggedIn && (
						<Button color="text.default" variant="text">
							Profile
						</Button>
					)}
					{!loggedIn && (
						<Button color="text.default" variant="text">
							Login
						</Button>
					)}
				</StyledToolbar>
			</Container>
		</AppBar>
	);
}

export default TopBar;
