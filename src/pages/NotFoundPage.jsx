import { useNavigate } from "react-router";
import { Url } from "../constants";
import TopPanelBar from "../components/TopPanelBar";
import { Box, Container } from "@mui/material";
import TopContainer from "../components/TopContainer;";
import TopBar from "../components/TopBar";

function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<TopContainer>
			<Container maxWidth="lg">
				<TopBar />
				<Box marginTop="80px">
					<h1>404 Page not found</h1>
					<a
						href=""
						onClick={() => {
							navigate(Url.HOME);
						}}
					>
						Return to home page.
					</a>
				</Box>
			</Container>
		</TopContainer>
	);
}

export default NotFoundPage;
