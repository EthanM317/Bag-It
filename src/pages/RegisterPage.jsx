import { Url } from "../constants";
import Form from "../components/Form";

function RegisterPage() {
	return (
		<>
			<h1 className="title">Register Page</h1>
			<Form route={Url.BACKEND_REGISTER} register={true} />
		</>
	);
}

export default RegisterPage;
