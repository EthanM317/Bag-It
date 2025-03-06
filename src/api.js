import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

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

// -- Backend wrapper class --
export class Backend {
    // -- Users --
    // Get all users in the database
	static getUsers() {
		api.get("/accounts/users")
			.then((res) => res.data)
			.then((data) => {
				let users = data;
                console.log(users);
                return users;
			})
			.catch((err) => alert(err));
	}

	// -- Clothing --
	static getClothing() {}
}
