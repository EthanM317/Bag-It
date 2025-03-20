import {
	Avatar,
	Button,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Url } from "../../constants";

// List of bags

function BagList({ bags, isAuthenticated, openDeleteDialog }) {
	const navigate = useNavigate();

	function clickBag(e, bagId) {
		// e.preventDefault();
		console.log("Clicked. bagId: " + bagId);
		navigate(Url.BAG + "/" + bagId);
	}

	return (
		<List
			sx={{
				width: "100%",
				maxWidth: 360,
				bgcolor: "background.paper",
			}}
			component="nav"
			// aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Bags
				</ListSubheader>
			}
		>
			{bags.map((bag) => (
				<ListItemButton onClick={(e) => clickBag(e, bag.id)}>
					<ListItemAvatar>
						<Avatar>
							<ShoppingBagOutlinedIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={bag.title}
						secondary={bag.description}
					/>
					{/* <Button onClick={() => deleteBag(bag.id)}>
								Delete
							</Button> */}
					{isAuthenticated && (
						<Button onClick={(e) => openDeleteDialog(e, bag.id)}>
							Delete
						</Button>
					)}
				</ListItemButton>
			))}
		</List>
	);
}

export default BagList;
