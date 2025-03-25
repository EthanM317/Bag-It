import React from "react";
import { useState, useEffect } from "react";
import "../styles/Feed.css";
import { Backend, api } from "../api";
import { Url } from "../constants";
import TopPanelBar from "../components/TopPanelBar";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function TestPage() {
	const [items, setItems] = useState([]);

	const [view, setView] = React.useState('list');

  	const handleChange = (event, nextView) => {
    	setView(nextView);
  	};

	// Gets called once when the component is created
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
	};

	return (
		<>
			<TopPanelBar />
			<div className="container">
				<div className="errorMessage">
					<p>
						USE THIS BUTTON IF YOU GET AN ERROR LIKE "request failed
						with status code 401".
						<br />
						This could be the result of a bad access/refresh token
						that the backend is rejecting for some reason...
					</p>
					<button onClick={clearLocalStorage}>
						CLEAR LOCAL STORAGE
					</button>
				</div>

				{items.map((item) => (
					<div key={item.id} className="itemContainer">
						<p>{item.name}</p>
						<img
							className="image"
							src={item.image}
							alt={item.name}
						/>
					</div>
				))}
			</div>
		</>
	);
}

export default TestPage;
