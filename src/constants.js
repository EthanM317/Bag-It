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
	FEED:		"/products",

	// DEBUG
	TEST: 		"/test",

	// -- Backend --
	BACKEND_REGISTER:			"/accounts/signup/",
	BACKEND_TOKEN:				"/accounts/token/",
	BACKEND_TOKEN_REFRESH:		"/accounts/token/refresh/",
	
	BACKEND_USER:				"/accounts/users/",
	BACKEND_CURRENT_USER:		"/accounts/users/current/",
	
	// Clothing
	BACKEND_CLOTHING:			"/clothing/",
	BACKEND_CLOTHING_LIST:		"/clothing/idlist/",
	
	// Bags
	BACKEND_BAG:				"/accounts/bag/",
	BACKEND_BAG_CREATE:			"/accounts/bag/create/",
	BACKEND_BAG_DELETE:			"/accounts/bag/delete/",
	BACKEND_BAG_ITEMS:			"/accounts/bag/item/",
	BACKEND_BAG_ITEM_CREATE:	"/accounts/bag/item/create/",
	BACKEND_BAG_ITEM_DELETE:	"/accounts/bag/item/delete/",
};
