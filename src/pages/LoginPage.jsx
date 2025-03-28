import { Url } from "../constants";
import Form from "../components/Form";
import TopPanelBar from "../components/TopPanelBar";
import "../styles/Login.css"
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import { Container } from "@mui/material";

function LoginPage() {
	return (
		<Container sx={{marginTop: "140px"}}>
			{/* <TopPanelBar /> */}
			{/* <NavBar /> */}

			<TopBar />
			<h1 className="title">Login Page</h1>
			<Form route={Url.BACKEND_TOKEN} register={false} />
		</Container>
	);
}

export default LoginPage;
