import React from "react";
import { useState } from "react";

import { Backend, api } from "../api";

function TestPage() {
	Backend.getUsers();

	return (
		<div>
			<p>i love shit</p>
		</div>
	);
}

export default TestPage;
