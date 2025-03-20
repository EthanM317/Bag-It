import { Url } from "../constants";
import Form from "../components/Form";
import "../styles/Login.css"
import TopPanelBar from "../components/TopPanelBar";

function LoginPage() {
	return (
		<>
			<TopPanelBar />
			<h1 className="title">Login Page</h1>
			<Form route={Url.BACKEND_TOKEN} register={false} />
		</>
	);
}

export default LoginPage;
