import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import styles from '../app/styles/UpdateUserComponent.module.css';
import { useUser } from '../context/UserContext';


export  default function FetchUpdateUser({id}) {
	const router = useRouter();
	const { user, loading } = useUser();
	console.log(user, loading, "different values");
	const cookies = new Cookies();
	const token = cookies.get('access_token');
	const [username, setUsername] = useState('');
	const [first_name, setFirstname] = useState('');
	const [last_name, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	function refreshPush() {
		router.refresh();
		router.push(`/account/${id}/`);
	};

	function	notification (message) {
		return toast(`${message}`)
	}
	
	const EditUser = async (token, id) => {
		console.log('id for user', id)
		if (!token && !id) {
			console.error('No token or id found');
			return;
		}
		try {
			const response = await axios.put(`http://localhost:8000/user/update/${id}/`, {
				username,
				first_name,
				last_name,
				email,
				password,
			}, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			if(response.status === 200){
				refreshPush();
				notification(response.data.message);
			}else {
				console.error('request error')
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	return (
		<main className={styles.update__user__container}>
			<div className={styles.update__photo__container}>
				<img className={styles.update__aside__photo} src="https://res.cloudinary.com/didthhgmq/image/upload/v1716895574/samples/e-shop-project/pexels-i-dris-kurt-226643497-24960520_epqlhg.jpg" alt="Description de l'image"/>
			</div>
			<div className={styles.update__user}>
				<div className={styles.update__user__title}>
					<h1>Update account</h1>
				</div>
				<div className={styles.update__user__form} >
					<label className={styles.update__user__label} htmlFor="username">
						Username
						<input className={styles.update__user__input}
							type='text'
							id='username'
							name='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							/>
					</label>
					<label className={styles.update__user__label} htmlFor="firstname">
						Firstname
						<input className={styles.update__user__input}
							type='text'
							id='firstname'
							name='firstname'
							value={first_name}
							onChange={(e) => setFirstname(e.target.value)}
							/>
					</label>
					<label className={styles.update__user__label} htmlFor='lastname'>
						Lastname
						<input className={styles.update__user__input}
							type='text'
							id='lastname'
							name='lastname'
							value={last_name}
							onChange={(e) => setLastname(e.target.value)}
							/>
					</label>
					<label className={styles.update__user__label} htmlFor='email'>
						Email
						<input className={styles.update__user__input}
							type='email'
							id='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							/>
					</label>
					<label className={styles.update__user__label} htmlFor='password'>
						Password
						<input className={styles.update__user__input}
							type='password'
							id='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							/>
					</label>
						<button className={styles.update__user__button} onClick={() => EditUser(token, id)}>Update account</button>
					<ToastContainer />
				</div>
			</div>
		</main>
	)
}