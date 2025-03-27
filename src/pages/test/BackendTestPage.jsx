import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Backend } from "../../api";

// For testing stuff in the backend... we can delete this later

function BackendTestPage() {
	const [users, setUsers] = useState([]);

    async function getUsersPressed(e) {
        let data = await Backend.getUsers();
        console.log(data);
        setUsers(data);
    }

	return (
		<Container>
			<Button onClick={getUsersPressed}>Get Users</Button>

            <Typography variant="h4">Users:</Typography>
			{users &&
				users.map((user) => (
					<Box>
						<Typography variant="h7">{user.username} (id: {user.id})</Typography>
					</Box>
				))}
		</Container>
	);
}

export default BackendTestPage;
