import {
	Button,
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListSubheader,
	ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { Url } from "../../constants";

// List of items used in the bag edit page

function ItemList({ items, deleteItem }) {
	const [actualItems, setActualItems] = useState([]);

	useEffect(() => {
		getClothingItems();
	}, [items]);

	async function getClothingItems() {
		// Horrible way of doing this
		let temp = [];

		try {
			for (let i = 0; i < items.length; i++) {
				let item = items[i];
				const res = await api.get(
					Url.BACKEND_CLOTHING + "?itemId=" + item.clothingItem
				);

				let addItem = res.data[0];
				temp.push(addItem);
			}
		} catch (error) {
			alert(error);
		}

		setActualItems(temp);
	}

	function createListItems() {
		// Prevent crashes
		if (items.length != actualItems.length)
			return;

		let result = [];

		for (let i = 0; i < actualItems.length; i++) {
			let actualItem = actualItems[i];
			let item = items[i];

			result.push(
				<ListItem>
					<ListItemAvatar>
						<img
							width={64}
							height={64}
							src={actualItem.image}
							alt={actualItem.name}
						/>
					</ListItemAvatar>
					<ListItemText primary={actualItem.name} />
					<Button onClick={(e) => deleteItem(e, item.id)}>
						Delete
					</Button>
				</ListItem>
			);
		}

		return result;
	}

	return (
		<>
			<List
				sx={{
					width: "100%",
					maxWidth: 500,
				}}
				component="nav"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Bag Items
					</ListSubheader>
				}
			>
				{createListItems()}
			</List>
		</>
	);
}

export default ItemList;
