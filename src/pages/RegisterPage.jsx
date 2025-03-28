import { Url } from "../constants";
import Form from "../components/Form";
import TopPanelBar from "../components/TopPanelBar";
import NavBar from "../components/NavBar";
import { Container } from "@mui/material";
import TopBar from "../components/TopBar";

function RegisterPage() {
	return (
		<Container sx={{marginTop: "140px"}}>
			{/* <TopPanelBar /> */}
			{/* <NavBar /> */}

			<TopBar />
			<h1 className="title">Register Page</h1>
			<Form route={Url.BACKEND_REGISTER} register={true} />
		</Container>
	);
}

export default RegisterPage;
