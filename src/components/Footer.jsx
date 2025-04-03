import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";

function Footer() {
	return (
		<Grid2
			container
			// alignContent="center"
            justifyContent="center"
			alignItems="center"
			sx={{
				minHeight: "100px",
				outline: "1px solid #282870",
			}}
		>
			<Grid2 item>
				<Typography color="primary">Copyright © 2025-present Peartech</Typography>
			</Grid2>
		</Grid2>
	);
}

export default Footer;
