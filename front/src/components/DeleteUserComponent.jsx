import axios from 'axios';
import styles from '../app/styles/DeleteUserComponent.module.css';
import React, { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";


export default function FetchDeleteUser ({id}) {
	const cookies = new Cookies();
	const router = useRouter();
	const [user, setUser] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(true); 
	const token = cookies.get('access_token');
	const userInfo = cookies.get('user_info');


	function	notification (message) {
		return toast(`${message}`);
	}

	function redirectTo() {
		setTimeout(() => {
			router.push('/');
		}, 4000);
  };

	function handleLogOut() {
		const cookies = new Cookies();
		cookies.remove('access_token');
		cookies.remove('user_info');
	};
	
	const deleteUser = async (token, id) => {
		if (!token) {
			console.error('No token found');
			return;
  	}
		if (!id) {
			console.error('No id found');
      return;
    }
		try {
			const response = await axios.delete(`http://localhost:8000/user/delete/${id}/`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			if(response.status === 200){
				setUser(false);
				handleLogOut();
				setIsLoggedIn(false);
				redirectTo();
				notification(response.data.message);
			}else {
				console.error("request error")
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	return (
		<div>
			<button className={styles.account__buttons__button} onClick={() => deleteUser(token, id)}>Delete User</button>
			<ToastContainer />
		</div>
	)
}