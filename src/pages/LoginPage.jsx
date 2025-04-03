import { Url } from "../constants";
import Form from "../components/Form";
import "../styles/Login.css";
import TopBar from "../components/TopBar";
import { Box, Container } from "@mui/material";
import TopContainer from "../components/TopContainer";
import Footer from "../components/Footer";

function LoginPage() {
	return (
		<Box>
			<TopContainer marginBottom="-100px">
				<Container
					sx={{
						marginTop: "140px",
					}}
				>
					<TopBar />
					<Box
						sx={{
							animation: "fadeIn 0.4s ease-in-out",
						}}
					>
						<h1 className="title">Login</h1>
					</Box>
					<Form route={Url.BACKEND_TOKEN} register={false} />
				</Container>
			</TopContainer>
			<Footer />
		</Box>
	);
}

export default LoginPage;
