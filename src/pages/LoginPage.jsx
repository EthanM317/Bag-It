import { Url } from "../constants";
import Form from "../components/Form";
import TopPanelBar from "../components/TopPanelBar";
import "../styles/Login.css"
import NavBar from "../components/NavBar";

function LoginPage() {
	return (
		<>
			{/* <TopPanelBar /> */}
			<NavBar />
			<h1 className="title">Login Page</h1>
			<Form route={Url.BACKEND_TOKEN} register={false} />
		</>
	);
}

export default LoginPage;
