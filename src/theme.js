import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
	cssVariables: true,
	palette: {
		mode: "dark",
		// mode: "light",

		primary: {
			main: "#556cd6",
		},
		secondary: {
			// main: "#19857b",
			main: "#bf365d",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#080029",
			paper: "#1b1d3d",
		},
		text: {
			default: "#d5d6dfff",
			// default: "#b8b9c2",
		},
	},
	components: {
		MuiDialog: {
			styleOverrides: {
				paper: {
					backgroundColor: "#080029",
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
			  root: {
				backgroundColor: "#080029",
			  },
			},
		  },
	},
});

export default theme;
