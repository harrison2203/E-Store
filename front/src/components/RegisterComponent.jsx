import React, { useState } from "react";
import axios from 'axios';
import styles from '../app/styles/RegisterComponent.module.css'


export default function Register() {
	const [username, setUsername] = useState("");
	const [first_name, setFirstname] = useState("");
	const [last_name, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('username', username);
		formData.append('first_name', first_name);
		formData.append('last_name', last_name);
		formData.append('email', email);
		formData.append('password', password);
		try {
			const response = await axios.post('http://localhost:8000/sign-in/', formData,
			{
				headers: { "Content-Type": "multipart/form-data" },
			});
			if (response.status === 201) {
				console.log('display request', response.data);
			} else {
				console.error('Error detected');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			console.error('error response data', error.response.data);
		}
	}
	return (
		<main className={styles.register__container}>
			<div className={styles.register__photo__container}>
					<img className={styles.register__photo} src="https://res.cloudinary.com/didthhgmq/image/upload/v1716895574/samples/e-shop-project/pexels-i-dris-kurt-226643497-24960520_epqlhg.jpg" alt="Description de l'image"/>
			</div>
			<div className={styles.register}>
				<div className={styles.register__title}>
					<h1>Create new account</h1>
				</div>
				<form className={styles.register__form} onSubmit={handleSubmit}>
					<label className={styles.register__label} htmlFor="username">
						Username
						<input className={styles.register__input}
							type="text"
							id="username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							/>
					</label>
					<label className={styles.register__label} htmlFor="firstname">
						Firstname
						<input className={styles.register__input}
							type="text"
							id="firstname"
							name="firstname"
							value={first_name}
							onChange={(e) => setFirstname(e.target.value)}
							/>
					</label>
					<label  className={styles.register__label} htmlFor="lastname">
						Lastname
						<input className={styles.register__input}
							type="text"
							id="lastname"
							name="lastname"
							value={last_name}
							onChange={(e) => setLastname(e.target.value)}
							/>
					</label>
					<label className={styles.register__label} htmlFor="email">
						Email
						<input className={styles.register__input}
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							/>
					</label>
					<label  className={styles.register__label} htmlFor="password">
						Password
						<input className={styles.register__input}
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							/>
					</label>
					<button className={styles.register__button} type="submit">Register</button>
				</form>
			</div>
		</main>
	);
}