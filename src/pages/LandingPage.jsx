import React from "react";

import "../styles/Landing.css";
import { Box, Button, Container, Paper, Typography } from "@mui/material";

export function LandingPage() {
	return <Container>
        
    </Container>;
}

export function TestLandingPage() {
	const services = ["Service 1", "Service 2", "Service 3"];

	return (
		<Container>
			<Typography
				variant="h1"
				sx={{
					marginY: 4,
					textAlign: "center",
					color: "primary.main",
				}}
			>
				Bag-It
			</Typography>
			<Typography variant="h2">Overview</Typography>

			<Box
				sx={{
					pt: 4,
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					justifyContent: "space-between",
					gap: 4,
				}}
			>
				{services.map((service) => (
					<Paper elevation={3} sx={{ width: { xs: 1, md: 320 } }}>
						<Box sx={{ m: 3 }}>
							<Typography variant="h3">{service}</Typography>
							<Typography sx={{ mt: 2 }}>
								Lorem ipsum dolor sit, amet consectetur
								adipisicing elit. Quas autem quibusdam dolor
								neque, eligendi ipsum ab repudiandae sapiente
								quam eum in pariatur inventore, quis
								reprehenderit distinctio praesentium mollitia
								libero. Impedit.
							</Typography>
							<Button
								variant="contained"
								sx={{ mt: 2, color: "secondary" }}
							>
								Learn More
							</Button>
						</Box>
					</Paper>
				))}
			</Box>
		</Container>
	);
}
