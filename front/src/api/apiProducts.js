import axios from "axios";

const BASE_URL = "http://localhost:8000";

const apiProducts = axios.create({
	baseURL : BASE_URL,
	headers : {
		'Content-Type': 'application/json',
	},
});

export const _get = (url) => {
	return apiProducts.get(url);
}






