import axios from "axios";
import { ACCESS_TOKEN, Url } from "./constants";

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
		const retries = 10;

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
				// TODO: Check what type of error this is
				alert("An error happened!\nResponse: " + res);
				return res;
			}
		}

		alert("Error: Connection timed out.");
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

	// -- Clothing --

	/**
	 * 
	 */
	static getClothing() {
		api.get("/clothing/")
			.then((res) => res.data)
			.then((data) => {
				let clothing = data;
				// console.log(clothing);
				return clothing;
			})
			.catch((err) => alert(err));
	}
}
