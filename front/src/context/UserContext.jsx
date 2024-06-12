import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const UserContext = createContext();

export default function UserProvider({children, id}) {
	const cookies = new Cookies();
	const token = cookies.get('access_token');
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (token && id) {
			getUser(token, id);
		} else {
			console.error('No token found');
		}
	}, [token, id]);

	async function getUser(token, id) {
		console.log('execution get user')
		try {
			const response = await axios.get(`http://localhost:8000/users/${id}/`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			if(response.status === 200){
				console.log(response)
				setUser(response.data);
			} else {
				console.error("request error")
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	return (
		<UserContext.Provider value={{ user }}>
				{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = React.useContext(UserContext);
		console.log('contextttttttt', context)
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}