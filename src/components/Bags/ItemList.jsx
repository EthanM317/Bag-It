import { Avatar, List, ListItemAvatar, ListItemButton, ListSubheader } from "@mui/material";
import React from "react";

// List of items used in the bag edit page

function ItemList({ items }) {
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
				{items.map((item) => (
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar>
                                {/* Put image here */}
                            </Avatar>
                        </ListItemAvatar>
                    </ListItemButton>
                ))
                }
			</List>
		</>
	);
}

export default ItemList;
