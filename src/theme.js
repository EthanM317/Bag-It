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
			default: "#080029ff",
		},
		text: {
			default: "#d5d6dfff",
			// default: "#b8b9c2",	
		}
	},
});

export default theme;
