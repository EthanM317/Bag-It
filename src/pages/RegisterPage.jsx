import { Url } from "../constants";
import Form from "../components/Form";
import TopPanelBar from "../components/TopPanelBar";

function RegisterPage() {
	return (
		<>
			<TopPanelBar />
			<h1 className="title">Register Page</h1>
			<Form route={Url.BACKEND_REGISTER} register={true} />
		</>
	);
}

export default RegisterPage;
