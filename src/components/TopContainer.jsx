import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// The Top-level box that has the

const TopContainer = styled(Box)(({ theme }) => ({
	bgcolor: "#080029ff",
	minHeight: "100vh",
	color: "#d5d6dfff",
	padding: "2rem 0",

	width: "100%",
	backgroundRepeat: "no-repeat",
	backgroundImage:
		"radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
	...theme.applyStyles("dark", {
		backgroundImage:
			"radial-gradient(ellipse 80% 50% at 50% -20%, hsla(310, 94.00%, 26.10%, 0.67), transparent)",
	}),
}));

export default TopContainer;