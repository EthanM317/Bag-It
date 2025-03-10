import React from "react";

import { Url } from "../constants";
import Form from "../components/Form";

function LoginPage() {
	return (
		<>
			<h1 className="title">Login Page</h1>
			<Form route={Url.BACKEND_TOKEN} register={false} />
		</>
	);
}

export default LoginPage;
