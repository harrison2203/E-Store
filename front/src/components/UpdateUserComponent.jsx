import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";


export  default function FetchUpdateUser({id}) {
	const router = useRouter();
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
		<div>
			<h1>Update account</h1>
			<label htmlFor="username">
				Username
				<input
 					type='text'
 					id='username'
 					name='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>
			<label htmlFor="firstname">
				Firstname
				<input
					type='text'
					id='firstname'
					name='firstname'
					value={first_name}
					onChange={(e) => setFirstname(e.target.value)}
				/>
			</label>
			<label htmlFor='lastname'>
				Lastname
				<input
					type='text'
					id='lastname'
					name='lastname'
					value={last_name}
					onChange={(e) => setLastname(e.target.value)}
				/>
			</label>
			<label htmlFor='email'>
				Email
				<input
					type='email'
					id='email'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					/>
			</label>
			<label htmlFor='password'>
				Password
 				<input
 					type='password'
 					id='password'
					name='password'
					value={password}
 					onChange={(e) => setPassword(e.target.value)}
					/>
			</label>
				<button onClick={() => EditUser(token, id)}>Update account</button>
				<ToastContainer />
		</div>
	)
}


// import axios from 'axios';
// import React, { useState, useEffect } from "react";
// import { getUser } from '../context/UserContext';
// import Cookies from 'universal-cookie';
// import Link from 'next/link';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export  default function FetchUpdateUser({id}) {
// 	console.log('id path', id);
// 	const cookies = new Cookies();
// 	const token = cookies.get('access_token');
// 	console.log('token exec', token)

// 	const [userid, setUserid] = useState("");
// 	console.log("user id test", userid)
// 	const [username, setUsername] = useState("");
// 	const [first_name, setFirstname] = useState("");
// 	const [last_name, setLastname] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");

// 	useEffect(() => {
// 		const storedUser = JSON.parse(localStorage.getItem('user'));
// 		console.log('stored user from local', storedUser)
// 		if (storedUser) {
// 			setUserid(storedUser.id);
// 			setUsername(storedUser.username);
// 			setFirstname(storedUser.first_name);
// 			setLastname(storedUser.last_name);
// 			setEmail(storedUser.email);
// 			setPassword(storedUser.password);
// 		}
// 	}, []);

// 	function	notification (message) {
// 		return toast(`${message}`)
// 	}

// 	const EditUser = async (token, id) => {

// 		if (!token && !id) {
// 			console.error('No token or id found');
// 			return;
// 		}
// 		try {
// 			const response = await axios.put(`http://localhost:8000/user/update/${id}/`, {
// 				username,
// 				first_name,
// 				last_name,
// 				email,
// 				password,
// 			}, {
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				}
// 			});
// 			console.log('REQUESTTTTTT', response.data.message)
// 			if(response.status === 200){
// 				notification(response.data.message);
// 				getUser(token,id)
// 			}else {
// 				console.error("request error")
// 			}
// 		} catch (error) {
// 			console.error('Error fetching data:', error);
// 		}
// 	};
// 	return (
// 		<div>
// 			<h1>Update account</h1>
// 			<label htmlFor="username">
// 				Username
// 				<input
//  					type="text"
//  					id="username"
//  					name="username"
// 					value={username}
// 					onChange={(e) => setUsername(e.target.value)}
// 				/>
// 			</label>
// 			<label htmlFor="firstname">
// 				Firstname
// 				<input
//  					type="text"
//  					id="firstname"
// 					name="firstname"
//  					value={first_name}
//  					onChange={(e) => setFirstname(e.target.value)}
// 				/>
//  			</label>
// 			<label htmlFor="lastname">
// 				Lastname
// 				<input
//  					type="text"
//  					id="lastname"
//  					name="lastname"
// 					value={last_name}
//  					onChange={(e) => setLastname(e.target.value)}
// 				/>
//  			</label>
// 			<label htmlFor="email">
//  				Email
//  				<input
// 					type="email"
// 					id="email"
//  					name="email"
// 					value={email}
// 					onChange={(e) => setEmail(e.target.value)}
//  					/>
//  			</label>
// 			<label htmlFor="password">
//  				Password
//  				<input
//  					type="password"
//  					id="password"
// 					name="password"
// 					value={password}
//  					onChange={(e) => setPassword(e.target.value)}
// 					/>
// 			</label>
// 				<Link href={`/account/${userid}/`}>
// 					<button onClick={() => EditUser(token, id)}>Update account</button>
// 					<ToastContainer />
//  				</Link>
// 	</div>
// 	)
// }
