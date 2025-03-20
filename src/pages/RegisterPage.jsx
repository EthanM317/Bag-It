import { Url } from "../constants";
import Form from "../components/Form";
import TopPanelBar from "../components/TopPanelBar";
import NavBar from "../components/NavBar";

function RegisterPage() {
	return (
		<>
			{/* <TopPanelBar /> */}
			<NavBar />
			<h1 className="title">Register Page</h1>
			<Form route={Url.BACKEND_REGISTER} register={true} />
		</>
	);
}

export default RegisterPage;
