import React from "react";
import { useState, useEffect } from "react";
import { api } from "../api";

import Form from "../components/Form";
import "../styles/home.css";

function LoginPage() {
	return (
		<>
			<h1 className="title">Login Page</h1>
			<Form />
		</>
	);
}

export default LoginPage;
