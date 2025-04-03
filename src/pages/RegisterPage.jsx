import { Url } from "../constants";
import Form from "../components/Form";
import { Box, Container } from "@mui/material";
import TopBar from "../components/TopBar";
import TopContainer from "../components/TopContainer";
import Footer from "../components/Footer";

function RegisterPage() {
	return (
		<Box>
			<TopContainer marginBottom="-100px">
				<Container sx={{ marginTop: "140px" }}>
					<TopBar />
					<Box
						sx={{
							animation: "fadeIn 0.4s ease-in-out",
						}}
					>
						<h1 className="title">Register</h1>
					</Box>
					
					<Form route={Url.BACKEND_REGISTER} register={true} />
				</Container>
			</TopContainer>
			<Footer />
		</Box>
	);
}

export default RegisterPage;
