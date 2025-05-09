import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN, Url } from "./constants";

// -- Communicate with backend using Axios --
export const api = axios.create({
	// Import environment variable
	baseURL: import.meta.env.VITE_API_URL,
});

// Automatically add the correct headers to any requests we make
api.interceptors.request.use(
	(config) => {
		// See if we have an access token
		// If so, add it as a header to our request
		const token = localStorage.getItem(ACCESS_TOKEN);

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},

	(error) => {
		return Promise.reject(error);
	}
);

// -- Request type constants --
const GET = 0;
const POST = 1;
const DELETE = 2;

/**
 * Static backend wrapper class.
 * If you're doing api calls from the frontend, use this.
 */
export class Backend {
	/**
	 * Basic request wrapper
	 * Handles authentication errors
	 * @param type The type of request to make
	 * @param url Backend url destination
	 * @param data (optional) the data to send along with the request
	 */
	static async #request(type, url, data = null) {
		// How many times we will try to request before stopping
		const retries = 5;

		// Time out after trying this a few times
		for (let i = 0; i < retries; i++) {
			try {
				let res;
				switch (type) {
					case GET:
						res = await api.get(url);
						break;

					case POST:
						if (data != null) {
							res = await api.post(url, data);
						} else {
							res = await api.post(url);
						}
						break;

					case DELETE:
						res = await api.delete(url);
						break;

					default:
						alert("Error: Request type invalid.");
						break;
				}

				return res;
			} catch (error) {
				// Check what type of error this is
				let status = error.status;

				switch (status) {
					case 401:
						// User probably isn't authenticated

						// If localstorage is empty, there's nothing we can do
						if (!this.checkForTokens()) {
							// alert("Sorry! You have to be logged in to do that.");
							return null;
						}

						// Try refreshing the token and requesting again
						try {
							const res = await api.get(
								Url.BACKEND_TOKEN_REFRESH
							);
						} catch (e) {
							// Failed to refresh, so we must have some garbage data...
							// Clear local storage and try again...
							localStorage.clear();
						}
						break;
				}
			}
		}
		alert("Error: Connection timed out.");
		return null;
	}

	/**
	 * Check if localStorage has an access, and a refresh token.
	 * THIS FUNCTION DOES NOT VERIFY THE TOKENS, IT SIMPLY CHECKS IF BOTH CONTAIN A VALUE
	 */
	static checkForTokens() {
		return (
			localStorage.getItem(ACCESS_TOKEN) != null &&
			localStorage.getItem(REFRESH_TOKEN) != null
		);
	}

	// -- Users --
	/**
	 * Return list of all registered users
	 * @async
	 * @returns {[User]} list of user objects
	 */
	static async getUsers() {
		console.log("Getting users...");

		const res = await this.#request(GET, Url.BACKEND_USER);
		return res.data;
	}

	/**
	 * Verify that the current user's token is valid
	 * If not, refresh it
	 * @returns true if verified, false if not
	 */
	static async verifyUser() {
		const res = await this.#request(GET, Url.BACKEND_CURRENT_USER);
		if (res != null) return true;
		return false;
	}

	/**
	 * Get the current user's information
	 * @returns user object if user is logged in
	 * @returns null if not logged in 
	 */
	static async getCurrentUser() {
		const res = await this.#request(GET, Url.BACKEND_CURRENT_USER);
		if (res == null || res.data[0] == null)
			return null;

		return res.data[0];
	}


	/**
	 * Login with credentials
	 * Automatically assigns the access and refresh tokens
	 * @returns [access token, refresh token]
	 */
	static async loginUser(username, password) {
		let res = await this.#request(POST, Url.BACKEND_TOKEN, {
			username,
			password,
		});

		// Set token values in localStorage
		localStorage.setItem(ACCESS_TOKEN, res.data.access);
		localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
	}

	/**
	 * Register a new user
	 */
	static async registerUser(username, password) {
		const res = await this.#request(POST, Url.BACKEND_REGISTER, {
			username,
			password,
		});

		// Set token values in localStorage
		localStorage.setItem(ACCESS_TOKEN, res.data.access);
		localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
	}

	// -- Bags --
	/**
	 * Create new bag
	 * Title and description are both required to be non-empty strings.
	 * This function WILL return null otherwise.
	 * @returns The newly created bag
	 */
	static async createNewBag(title, description) {
		if (title == null || description == null || title == "" || description == "")
			return null;
		
		const res = await this.#request(POST, Url.BACKEND_BAG_CREATE, {
			title: title,
			description: description,
		})
		if (res == null || res.data == null)
			return null;
		
		return res.data;
	}


	/**
	 * Get a list of the user's bags
	 * @param {*} userId The user's id
	 */
	static async getUsersBags(userId) {
		const res = await this.#request(GET, Url.BACKEND_BAG + "?userId=" + userId);
		if (res == null && res.data == null)
			return null;
	
		return res.data;
	}

	/**
	 * Add item to bag
	 */
	static async addItem(itemId, bagId) {
		const res = await this.#request(POST, Url.BACKEND_BAG_ITEM_CREATE, {
			bagParent: bagId,
			clothingItem: itemId,
		});
		if (res == null || res.data == null)
			return null;
		
		return res.data;
	}


	// -- Clothing --

	/**
	 * Get a list of all clothing items from the database
	 * @returns List of ClothingItem objects
	 */
	static async getAllClothingItems() {
		const res = await this.#request(GET, Url.BACKEND_CLOTHING);
		return res.data;
	}

	/**
	 * Get single clothing item from id
	 * @param id The id of the clothing item you want to fetch (can be a list to query multiple)
	 * @returns A ClothingItem object
	 */
	static async getClothingItem(id) {
		const url = Url.BACKEND_CLOTHING + "?itemId=" + id;
		const res = await this.#request(GET, url);
		return res.data[0];
	}

	/**
	 * Get a list of clothing items from a list of IDs
	 * @param idList A list of clothing item IDs
	 * @returns List of ClothingItem objects
	 */
	static async getClothingItems(idList) {
		let requestData = { id: idList };

		const res = await this.#request(
			POST,
			Url.BACKEND_CLOTHING_LIST,
			requestData
		);
		let responseData = res.data;

		// Backend Url
		let backendUrl = import.meta.env.VITE_API_URL + "/media/";

		// We only get unique items back from the server (no duplicates)
		// Make sure everything it returned in the same order
		let returnItems = [];
		for (let i = 0; i < idList.length; i++) {
			let id = idList[i];

			// For some reason, the backend URL isn't included in the image URL...
			// A bad fix, but will have to do for now
			if (!responseData[id].image.startsWith(backendUrl))
				responseData[id].image = backendUrl + responseData[id].image;

			returnItems.push(responseData[id]);
		}
		return returnItems;
	}

	// TODO: Some kind of fuzzy search through clothing items by name?
}
