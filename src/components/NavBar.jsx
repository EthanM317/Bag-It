import {
	AppBar,
	Box,
	Button,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import logo from "../assets/pear.png";
import HomeIcon from "@mui/icons-material/Home";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ACCESS_TOKEN, Url } from "../constants";
import { api } from "../api";
import { AccountCircle, AirlineSeatFlatAngled } from "@mui/icons-material";


const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
	  backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
	  marginLeft: theme.spacing(3),
	  width: 'auto',
	},
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
	  padding: theme.spacing(1, 1, 1, 0),
	  // vertical padding + font size from searchIcon
	  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	  transition: theme.transitions.create('width'),
	  width: '100%',
	  [theme.breakpoints.up('md')]: {
		width: '20ch',
	  },
	},
  }));


function NavBar() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		getAuthenticated();
	}, []);

	async function getAuthenticated() {
		if (!localStorage.getItem(ACCESS_TOKEN)) {
			setIsAuthenticated(false);
			return;
		}

		// This is a really hacky way to do this
		try {
			await api.get(Url.BACKEND_USER);
		} catch (error) {
			// If this failed, the user probably isn't authenticated
			setIsAuthenticated(false);
			return;
		}

		setIsAuthenticated(true);
	}

	function handleProfileMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleProfileClose() {
		setAnchorEl(null);
	}

	function profilePressed() {
		navigate(Url.PROFILE);
		handleProfileClose();
	}

	function getButtons() {
		if (isAuthenticated) {
			return (
				<>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleProfileMenu}
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorEl)}
						onClose={handleProfileClose}
					>
						<MenuItem onClick={profilePressed}>Profile</MenuItem>
						<MenuItem onClick={() => navigate(Url.LOGOUT)}>
							Log Out
						</MenuItem>
					</Menu>
				</>
			);
		} else {
			return (
				<>
					<Button color="inherit" onClick={() => navigate(Url.LOGIN)}>
						Login
					</Button>
				</>
			);
		}
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" elevation={5}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						{/* TODO Replace with actual Bagit csv */}
						{/* <img className="logo" alt="Logo" src={logo} /> */}
						<HomeIcon onClick={() => navigate(Url.HOME)} />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Bag It
					</Typography>
					{/* <div className="searchBar">
						<TextField label="Search" id="fullWidth" />
						<SearchIcon className="searchIcon" />
					</div> */}
					<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
					{getButtons()}
				</Toolbar>
			</AppBar>
			<AppBar position="static" elevation={0}>
				<Toolbar />
			</AppBar>
		</Box>
	);
}

export default NavBar;
