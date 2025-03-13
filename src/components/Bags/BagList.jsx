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
import React from "react";

// List of bags

function BagList({ bags, isAuthenticated, openDeleteDialog }) {

	function clickBag(bagId) {
		console.log("Clicked. bagId: " + bagId);
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
				<ListItemButton onClick={() => clickBag(bag.id)}>
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
