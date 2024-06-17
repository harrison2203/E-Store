import React from 'react';
import { useUser } from '../context/UserContext';
import { FaRegCircleUser } from "react-icons/fa6";
import Link from 'next/link';
import styles from '../app/styles/UserAccount.module.css';
import LoadingComponent from './LoadingComponent.jsx';
import DeleteUserComponent from '../components/DeleteUserComponent.jsx';


export default function FetchUserAccount() {
	const { user, loading } = useUser();

	if (loading) {
		return	<LoadingComponent />
	}

	return (
		<div className={styles.main__user__container}>
			{user && (
				<>
					<div className={styles.photo__container}>
							<img className={styles.photo__image} src="https://res.cloudinary.com/didthhgmq/image/upload/v1716994225/samples/e-shop-project/pexels-silviopelegrin-20345037_qbbirn.jpg" alt="image"  />
					</div>
					<div className={styles.user__account__container}>
						<div className={styles.user__account}>
							<div className={styles.account__information}>
								<h1 className={styles.account__information__title}>Personal Info</h1>
							</div>
								<a className={styles.account_icon}><FaRegCircleUser/></a>
								<h2 className={styles.account__username}>{user.username}</h2>
							<div className={styles.account_names}>
								<h3 className={styles.account_firstname}>{user.first_name}</h3>
								<h3 className={styles.account__lastname}>{user.last_name}</h3>
							</div>
								<h3 className={styles.account_email}>{user.email}</h3>
							<div className={styles.account__buttons}>
								<Link href={`/account/${user.id}/edit/`}>
									<button className={styles.account__buttons__button}>Edit Account</button>
								</Link>
								<DeleteUserComponent id={user.id}/>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}