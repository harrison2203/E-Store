import axios from 'axios';
import React, { useEffect, useState } from "react";
import styles from '../app/styles/FetchUsers.module.css';
import Cookies from 'universal-cookie';


export default function FetchUsers() {
	const cookies = new Cookies();
	const [users, setUsers] = useState([]);
	const token = cookies.get('access_token');

	useEffect(() => {
		if(token) {
			getUsers(token);
		}
	}, [token]);

	const getUsers = async (token) => {
		console.log('token auth', token)
		try {
			const response = await axios.get(`http://localhost:8000/users/`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			console.log('reponse', response)
			if (response.data && Array.isArray(response.data['Users List'])) {
				const userList = response.data['Users List'];
				setUsers(userList);
			} else {
				console.error("request error")
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	return (
		<main>
			<div className={styles.main}>
				<div className={styles.table_container}>
					<div className={styles.table__title}>
						<h1>Users</h1>
					</div>
					<table className={styles.table}>
						<thead className={styles.table__head}>
							<tr>
								<th>ID</th>
								<th>USERNAME</th>
								<th>FIRST NAME</th>
								<th>LAST NAME</th>
								<th>EMAIL</th>
								<th>DATE</th>
								<th>ROLE</th>
							</tr>
						</thead>
						<tbody className={styles.table__body}>
							{users.map(user => (
								<tr className={styles.tr} key={user.pk}>
									<td>{user.pk}</td>
									<td>{user.fields.username}</td>
									<td>{user.fields.first_name}</td>
									<td>{user.fields.last_name}</td>
									<td>{user.fields.email}</td>
									<td>{user.fields.date_joined}</td>
									<td>{user.fields.is_superuser}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
}