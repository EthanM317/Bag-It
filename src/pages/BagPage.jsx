import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Url } from "../constants";
import { api, Backend } from "../api";
import ItemList from "../components/Bags/ItemList";

function BagPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [bag, setBag] = useState({}); // Bag object with title/description
	const [items, setItems] = useState([]);

	const navigate = useNavigate();
	const { bagId } = useParams();

	useEffect(() => {
		// TODO: Consider having a "search for bags" page?
		if (!bagId) {
			// The default url with no params is invalid, just go back to profile
			navigate(Url.PROFILE);
		}

		// Get items
		getBagItems();
	}, []);

	async function getBagItems() {
		setIsLoading(true);
		try {
			// Get bagId's items
			const res = await api.get(
				Url.BACKEND_BAG_ITEMS + "?bagParent=" + bagId
			);
			setItems(res.data);
		} catch (error) {
			alert(error);
		}

		setIsLoading(false);
	}

	return (
		<>
			{!isLoading && (
				<div>
					<h1>Bag #{bagId}'s items</h1>
					<ItemList />
				</div>
			)}
		</>
	);
}

export default BagPage;
