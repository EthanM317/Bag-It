import React from "react";
import { useState, useEffect } from "react";

import { Backend, api } from "../api";

function TestPage() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		getItems();
	}, []);

	const getItems = () => {
		// setItems(Backend.getClothing());

		api.get("/clothing/")
			.then((res) => res.data)
			.then((data) => {
				setItems(data);
			})
			.catch((err) => alert(err));
	};

	return (
		<div>
			{/* <p>i love shit</p> */}
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
