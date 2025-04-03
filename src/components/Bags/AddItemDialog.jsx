import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
    Avatar,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	ListSubheader,
    ListItem,
	Box,
} from "@mui/material";

import { use, useEffect, useState } from "react";
import { api } from "../../api";
import { Url } from "../../constants";
import { useNavigate } from "react-router";

function AddItemDialog({ productItems, addItem }) {
	const [open, setOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

	const navigate = useNavigate();

	const openDialog = () => {
		setOpen(true);
	};

	const closeDialog = () => {
		setOpen(false);
	};

	useEffect(() => {}, []);

	const submitDialog = async () => {

		setOpen(false);
	};

	return (
		<Box sx={{marginBottom:"20px"}}>
			<Button variant="contained" onClick={openDialog}>
				+ Add Item
			</Button>
			<Dialog
				open={open}
				onClose={closeDialog}
				// TODO: Figure out what this two things are
				// aria-labelledby="alert-dialog-title"
				// aria-describedby="alert-dialog-description"
							>
				<DialogTitle id="alert-dialog-title">
					Item selection
				</DialogTitle>
				<DialogContent style={{margin:"10px"}}>
					<DialogContentText>
						Add a new item to your bag.
					</DialogContentText>

					<List
						sx={{
							width: "100%",
							maxWidth: 600,
							// bgcolor: "background.paper",
						}}
						component="nav"
						// aria-labelledby="nested-list-subheader"
						subheader={
							<ListSubheader
								component="div"
								id="nested-list-subheader"
							>
								Clothing Items
							</ListSubheader>
						}
					>
						{productItems.map((item) => (
							<ListItem
								// onClick={(e) => clickBag(e, bag.id)}
							>
								<ListItemAvatar>

								<Box sx={{marginRight: "10px"}}>
            		            	<img width={64} height={64} src={item.image} alt={item.name} />
								</Box>

								</ListItemAvatar>
								<ListItemText
									primary={item.name}
								/>
								{isAuthenticated && (
									<Button
                                    variant="contained"
										onClick={(e) =>
											addItem(e, item.id, item.name)
										}
									>
										Add
									</Button>
								)}
							</ListItem>
						))}
					</List>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={submitDialog}>Back</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default AddItemDialog;
