import React, { useEffect, useState } from "react";
import styles from '../app/styles/LoginComponent.module.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';


export default function Login() {
	const cookies = new Cookies();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useState("");

	useEffect(() => {
		const storedToken = cookies.get('access_token');
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		console.log(formData)
		try {
			const response = await axios.post('http://localhost:8000/login/', formData,
				{
					headers: { 
						"Content-Type": "multipart/form-data"
					},
				});
				if (response.status === 200) {
						const accessToken = response.data.token;
						const decodedToken = jwtDecode(accessToken);

						console.log('encrypted token', accessToken);
						console.log('decoded token', decodedToken);

						cookies.set('access_token', accessToken)
						cookies.set('user_info', JSON.stringify(decodedToken));

						setToken(accessToken)
				} else {
					console.error('request error');
				}
		} catch (error) {
			console.error('Error fetching data:', error, error.response);
		}
	}
	return (
		<main className={styles.login__container}>
			<div className={styles.login__photo__container}>
				<img className={styles.login__photo} src="https://res.cloudinary.com/didthhgmq/image/upload/v1716831581/samples/e-shop-project/pexels-just_b_nice_-227885140-20321807_r1bmz4.jpg" alt="Description de l'image"  />
			</div>
			<div className={styles.login}>
				<div className={styles.login__title}>
					<h1>Login</h1>
				</div>
				<form className={styles.login__form} onSubmit={handleSubmit}>
				<label className={styles.login__label} htmlFor="username">
					Username
					<input className={styles.login__input}
						type="text"
						id="username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						/>
				</label>
				<label className={styles.login__label} htmlFor="password">
					Password
					<input className={styles.login__input}
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						/>
				</label>
					<div className={styles.login__remember}>
						<input className={styles.remember__checkbox} type="checkbox" id="remember-checkbox" />
						<label className={styles.remember__label}for="remember-checkbox" class="remember__label">Remember me for 30 days</label>
					</div>
						<button className={styles.login__button} type="submit">Login</button>
					<div className={styles.login__register}>
						<p>Don't have an account ?</p>
							<Link href={'/register/'} legacyBehavior>
								<p>Register now</p>
							</Link>
					</div>
				</form>
			</div>
		</main>
	);
}