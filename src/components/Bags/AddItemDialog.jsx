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
import { api } from "../../api";
import { Url } from "../../constants";
import { useNavigate } from "react-router";

function AddItemDialog() {
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

    const openDialog = () => {
		setOpen(true);
	};

	const closeDialog = () => {
		setOpen(false);
	};

    const submitDialog = async () => {
		// Don't let us submit the dialog if we haven't typed anything
		// if (newBagName == "") return;

		// try {
		// 	// Create new bag in the backend based on the provided text fields
		// 	const res = await api.post(Url.BACKEND_BAG_CREATE, {
		// 		title: newBagName,
		// 		description: newBagDesc,
		// 	});

		// 	// Update the local bags list
		// 	let temp = structuredClone(bags);
		// 	temp.push(res.data);
		// 	setBags(temp);

		// 	// Close the dialog
		// 	setOpen(false);
		// } catch (error) {
            // 	alert(error);
            // }
        
        setOpen(false);
	};

	return (
		<>
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
				<DialogContent>
					<DialogContentText>
						Add a new item to your bag.
					</DialogContentText>
					
				</DialogContent>
				<DialogActions>
					<Button onClick={submitDialog}>OK</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default AddItemDialog;
