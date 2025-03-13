export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";

// -- URLS """enum""" --
// (see App.jsx on how to import and use this)
export const Url = {
	// -- Frontend --
	HOME: 		"/",
	LOGIN: 		"/login",
	LOGOUT:		"/logout",
	REGISTER: 	"/register",
	PROFILE: 	"/profile",
	ITEM:		"/item",
	BAG:		"/bag", 

	// DEBUG
	TEST: 		"/test",

	// -- Backend --
	BACKEND_CLOTHING:		"/clothing/",
	BACKEND_REGISTER:		"/accounts/signup/",
	BACKEND_TOKEN:			"/accounts/token/",
	BACKEND_TOKEN_REFRESH:	"/accounts/token/refresh/",

	BACKEND_USER:			"/accounts/users/",
	BACKEND_CURRENT_USER:	"/accounts/users/current/",

	BACKEND_BAG:			"/accounts/bag/",
	BACKEND_BAG_CREATE:		"/accounts/bag/create/",
	BACKEND_BAG_DELETE:		"/accounts/bag/delete/",
	BACKEND_BAG_ITEMS:		"/accounts/bag/item/"
};
