import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React, { useState } from "react";
import { Backend } from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

// For testing stuff in the backend... we can delete this later

function BackendTestPage() {
	const [users, setUsers] = useState([]);

	function setGarbageToken(e) {
		localStorage.setItem(ACCESS_TOKEN, "garbage");
		localStorage.setItem(REFRESH_TOKEN, "garbage");

		console.log("Set garbage access token");
		console.log(localStorage);
	}

	async function setValidToken(e) {
        let username = import.meta.env.ADMIN_USERNAME;
        let password = import.meta.env.ADMIN_PASSWORD;

        await Backend.loginUser(username, password);

		console.log("Set valid access token");
		console.log(localStorage);
	}
    
	function clearLocalStorage(e) {
        localStorage.clear();
		console.log("Cleared local storage");
        console.log(localStorage);
	}

	async function getUsersPressed(e) {
		let data = await Backend.getUsers();
		console.log(data);
		setUsers(data);
	}

	return (
		<Container sx={{ padding: 10 }}>
			<Typography variant="h3" marginBottom={3}>
				Backend Test Page
			</Typography>

			<Grid2 container marginBottom={4} spacing={1}>
				<Button variant="contained" onClick={setGarbageToken}>
					Set garbage token
				</Button>

				<Button variant="contained" onClick={setValidToken}>
					Set Vaild token
				</Button>

				<Button variant="outlined" onClick={clearLocalStorage}>
					Clear Local Storage
				</Button>
			</Grid2>

			<Grid2 container display="flex" spacing={20}>
				<Grid2 item>
					<Typography variant="h4">Users</Typography>
					<Button
						sx={{ marginBottom: "10px", marginTop: "10px" }}
						variant="outlined"
						onClick={getUsersPressed}
					>
						Get Users
					</Button>

					{users &&
						users.map((user) => (
							<Box>
								<Typography variant="h7">
									{user.username} (id: {user.id})
								</Typography>
							</Box>
						))}
				</Grid2>
				<Grid2 item>
					{/* <Typography variant="h4">Users:</Typography>
                    <Button sx={{marginBottom: "10px", marginTop: "10px"}} variant="outlined" onClick={getUsersPressed}>Get Users</Button> */}
				</Grid2>
			</Grid2>
		</Container>
	);
}

export default BackendTestPage;
