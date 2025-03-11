import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import { use, useState } from "react";
import { api } from "../api";
import { Url } from "../constants";
import { useNavigate } from "react-router";

// Button and Dialog for creating a new bag

function NewBagDialog({ reloadFunc }) {
	const [open, setOpen] = useState(false);
	const [newBagName, setNewBagName] = useState("");
	const [newBagDesc, setNewBagDesc] = useState("");

	const navigate = useNavigate();

	const openDialog = () => {
		setNewBagName("");
		setNewBagDesc("");
		setOpen(true);
	};

	const closeDialog = () => {
		setOpen(false);
	};

	const submitDialog = async () => {
		// Don't let us submit the dialog if we haven't typed anything
		if (newBagName == "") return;

		try {
			// Use api to create bag
			const res = await api.post(Url.BACKEND_BAG_CREATE, {
				title: newBagName,
				description: newBagDesc,
			});

			reloadFunc();

			setOpen(false);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<>
			<Button variant="contained" onClick={openDialog}>
				+ Add Bag
			</Button>
			<Dialog
				open={open}
				onClose={closeDialog}
				// TODO: Figure out what this two things are
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Add a New Bag.
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Create the best outfit anyone's ever seen in their life.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="bagname"
						label="Bag Name"
						fullWidth
						variant="standard"
						onChange={(e) => setNewBagName(e.target.value)}
					/>
					<TextField
						required
						margin="dense"
						id="desc"
						name="description"
						label="Description"
						fullWidth
						variant="standard"
						onChange={(e) => {
							let desc = e.target.value;
							if (!desc) desc = "";

							setNewBagDesc(desc);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={submitDialog}>OK</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default NewBagDialog;
