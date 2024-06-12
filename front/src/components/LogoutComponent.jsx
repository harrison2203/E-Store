import React, { useEffect, useState } from "react";
import axios from 'axios';



function Logout() {
	const [token, setToken] = useState("");

	const deleteToken = async (token, id) => {
		if (!token) {
			console.error('No token found');
      return;
    }
		if (!id) {
			console.error('No id found');
      return;
    }
		try {
			const response = await axios.delete(`http://localhost:8000/logout/${id}/`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			if(response.status === 200){
				setUser(response.data);
				notification()
			}else {
				console.error("request error")
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}