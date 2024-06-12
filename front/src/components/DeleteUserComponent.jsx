import axios from 'axios';
import styles from '../app/styles/DeleteUserComponent.module.css';
import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";


export default function FetchDeleteUser ({id}) {
	const cookies = new Cookies();
	const router = useRouter();
	const [user, setUser] = useState(null);
	const token = cookies.get('access_token');

	function	notification () {
		return toast("Delete Account Success")
	}

	function refreshPush() {
		setTimeout(() => {
			router.push('/');
			console.log("Voici le premier message");
		}, 5000);
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
				setUser(response.data);
				notification();
				refreshPush();
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