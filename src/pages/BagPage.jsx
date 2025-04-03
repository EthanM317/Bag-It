import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Url } from "../constants";
import { api, Backend } from "../api";
import ItemList from "../components/Bags/ItemList";
import AddItemDialog from "../components/Bags/AddItemDialog";
import TopPanelBar from "../components/TopPanelBar";
import { Box, Container, List, ListItem, ListItemText } from "@mui/material";
import NavBar from "../components/NavBar";
import TopContainer from "../components/TopContainer";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";

function BagPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [bag, setBag] = useState({}); // Bag object with title/description
	const [bagItems, setBagItems] = useState([]);
	const [productItems, setProductItems] = useState([]);

	const navigate = useNavigate();
	const { bagId } = useParams();

	useEffect(() => {
		// TODO: Consider having a "search for bags" page?
		if (!bagId) {
			// The default url with no params is invalid, just go back to profile
			navigate(Url.PROFILE);
		}
		// Get bag name/description
		getBagInfo();
	}, []);

	async function getBagInfo() {
		setIsLoading(true);
		// Get bag title/description
		try {
			const res = await api.get(Url.BACKEND_BAG + "?bagId=" + bagId);
			setBag(res.data[0]);
		} catch (error) {
			alert(error);
		}

		// Get items
		try {
			// Get bagId's items
			const res = await api.get(
				Url.BACKEND_BAG_ITEMS + "?bagParent=" + bagId
			);
			setBagItems(res.data);
		} catch (error) {
			alert(error);
		}
		setIsLoading(false);

		// Get All bagit items
		try {
			const res = await api.get(Url.BACKEND_CLOTHING);
			// console.log(res.data);
			setProductItems(res.data);
		} catch (error) {
			alert(error);
		}
	}

	async function addItem(e, itemId, itemName) {
		e.stopPropagation();

		try {
			const res = await api.post(Url.BACKEND_BAG_ITEM_CREATE, {
				bagParent: bagId,
				clothingItem: itemId,
			});

			let temp = structuredClone(bagItems);
			temp.push(res.data);
			setBagItems(temp);
		} catch (error) {
			alert(error);
			return;
		}
		console.log("added item: " + itemName);
	}

	async function deleteItem(e, itemId) {
		e.stopPropagation();

		try {
			const res = await api.delete(Url.BACKEND_BAG_ITEM_DELETE + itemId);

			// Update local list
			let temp = structuredClone(bagItems);
			let deleteIndex = -1;
			for (let i = 0; i < temp.length; i++) {
				// Linear search through this user's bags until we find the one
				if (temp[i].id == itemId) {
					deleteIndex = i;
					break;
				}
			}

			// Item couldn't be found
			if (deleteIndex < 0) return;

			// Delete the bag at that position in the list
			temp.splice(deleteIndex, 1);
			setBagItems(temp);
		} catch (error) {
			alert(error);
		}
	}

	return (
		<Box>
			<TopContainer>
				<TopBar />
				<Container maxWidth="lg">
					<Box marginTop="120px">
						{!isLoading && (
							<div>
								<Box
									sx={{
										animation: "fadeIn 0.3s ease-in-out",
									}}
								>
									<h1>{bag.title}'s items</h1>
								</Box>
								<AddItemDialog
									addItem={addItem}
									productItems={productItems}
								/>
								<ItemList
									deleteItem={deleteItem}
									items={bagItems}
								/>

								{/* Test list */}
								{/* {bagItems.map((item) => (
									<p>{item.id}</p>
									))} */}
							</div>
						)}
					</Box>
				</Container>
			</TopContainer>
			<Box>
				<Footer />
			</Box>
		</Box>
	);
}

export default BagPage;
