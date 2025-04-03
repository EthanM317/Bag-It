import logo from "../assets/pear.png";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router";
import {
	Avatar,
	Button,
	ButtonBase,
	ButtonGroup,
	IconButton,
} from "@mui/material";
import "../styles/Home.css";
import { Url } from "../constants";
import { useEffect } from "react";

//Top panel bar of the homepage. Contains logo, search bar, as well as account&bag icons

//TODO: add search functionality
//change account and bag icons to buttons
function TopPanelBar() {
	const navigate = useNavigate();

	

	function pearPressed() {
		navigate(Url.HOME);
	}

	function profilePressed() {
		navigate(Url.PROFILE);
	}

	function bagPressed() {
		navigate(Url.PROFILE);
	}

	return (
		<div className="topPanelBar">
			{/* <img className="logo" alt="Logo" src={logo} /> */}
			<div className="logo-div">
				<img className="logo" alt="Logo" src={logo} />
				<Link to={Url.HOME}>
					<span className="homePageLink"></span>
				</Link>
			</div>

			{/* <button onClick={pearPressed}>
				<img className="logo" alt="Logo" src={logo} />
			</button> */}
			{/* <ButtonGroup className="logo">
				<Button
					// variant="contained"
					startIcon={<Avatar src={logo} />}
					onClick={pearPressed}
					disableRipple={true}
					style={{
						color: "rgb(0,0,0,0)",
						// width: "200px",
						// height: "100px",
						backgroundColor: "#f5f5f5",
						// boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				></Button>
			</ButtonGroup> */}

			<div className="searchBar">
				<TextField label="Search" id="fullWidth" />
				<SearchIcon className="searchIcon" />
			</div>
			<div className="accountBar">
				<ButtonGroup>
					<IconButton onClick={profilePressed}>
						<AccountCircleIcon
							className="account"
							style={{ fontSize: "50px" }}
						/>
					</IconButton>

					<IconButton onClick={bagPressed}>
						<ShoppingBagIcon
							className="bag"
							style={{ fontSize: "50px" }}
						/>
					</IconButton>
				</ButtonGroup>
			</div>
			{/* <div className='categoryBar'>
        <h4>Popular Categories</h4>
      </div> */}
		</div>
	);
}

export default TopPanelBar;
