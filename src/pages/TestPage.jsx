import React from "react";
import { useState, useEffect } from "react";

import { Backend, api } from "../api";
import { Url } from "../constants";

function TestPage() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		getItems();
	}, []);

	const getItems = () => {
		// setItems(Backend.getClothing());

		api.get(Url.BACKEND_CLOTHING)
			.then((res) => res.data)
			.then((data) => {
				setItems(data);
			})
			.catch((err) => alert(err));
	};


	// If localStorage has a bad token, we might need to clear it. My quick solution for now...
	// TODO: figure out how to handle it properly later
	const clearLocalStorage = () => {
		localStorage.clear();
		console.log("Cleared local storage.");
		alert("Cleared local storage.\n(This will log you out.)");
	}

	return (
		<div>
			<div>
				<p>USE THIS BUTTON IF YOU GET AN ERROR LIKE "request failed with status code 401".<br/>This could be the result of a bad access/refresh token that the backend is rejecting for some reason...</p>
				<button onClick={clearLocalStorage}>
					CLEAR LOCAL STORAGE
				</button>
			</div>

			{/* TODO: Investigate "Each child in a list should have a unique 'key' error" */}
			{items.map((item) => (
                <>
                    <p>{item.name}</p>
                    <img src={item.image} alt={item.name} style={{
                        width: 200,
                        height: 200,
                        display: "inline"
                    }} />
                </>
			))}
		</div>
	);
}

export default TestPage;
