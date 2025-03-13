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

function BagList({ bags, isAuthenticated, openDeleteDialog }) {
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
				<ListItemButton>
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
						<Button onClick={() => openDeleteDialog(bag.id)}>
							Delete
						</Button>
					)}
				</ListItemButton>
			))}
		</List>
	);
}

export default BagList;
