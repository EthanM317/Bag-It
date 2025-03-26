import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

import { styled, alpha } from "@mui/material/styles";
import pearLogo from "../assets/bagit.svg";

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

function TopBar() {
	return (
		<AppBar
			position="fixed"
			enableColorOnDark
			sx={{
				boxShadow: 0,
				bgcolor: "transparent",
				backgroundImage: "none",

				// TODO: Wtf is this
				mt: "calc(var(--template-frame-height, 0px) + 28px)",
			}}
		>
			<Container maxWidth="lg">
				<StyledToolbar variant="dense" disableGutters sx={{
                    // bgcolor: "black"
                }} >
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							alignItems: "center",
							px: 0,
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
                        <Typography marginLeft="10px" color="text.default" fontWeight="bold">Bag-It</Typography>
					</Box>
				</StyledToolbar>
			</Container>
		</AppBar>
	);
}

export default TopBar;
