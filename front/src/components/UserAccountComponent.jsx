import React from 'react';
import { useUser } from '../context/UserContext';
import { FaRegCircleUser } from "react-icons/fa6";
import Link from 'next/link';
import styles from '../app/styles/UserAccount.module.css';
import LoadingComponent from './LoadingComponent.jsx';
import DeleteUserComponent from '../components/DeleteUserComponent.jsx';


export default function FetchUserAccount() {
	const { user } = useUser();

	return (
		<div className={styles.main__user__container}>
			{user ? (
				<>
					<div className={styles.photo__container}>
							<img className={styles.photo__image} src="https://res.cloudinary.com/didthhgmq/image/upload/v1716994225/samples/e-shop-project/pexels-silviopelegrin-20345037_qbbirn.jpg" alt="image"  />
					</div>
					<div className={styles.user__account__container}>
						<div className={styles.user__account}>
							<div className={styles.account__information}>
								<h2 className={styles.account__information__title}>Personal Info</h2>
							</div>
							<div className={styles.testons}>
								<a className={styles.account_icon}><FaRegCircleUser/></a>
							</div>
								<h1 className={styles.account__username}>{user.username}</h1>
							<div className={styles.account_names}>
								<h2 className={styles.account_firstname}>{user.first_name}</h2>
								<h2 className={styles.account__lastname}>{user.last_name}</h2>
							</div>
								<p className={styles.account_email}>{user.email}</p>
							<div className={styles.account__buttons}>
								<Link href={`/account/${user.id}/edit/`} legacyBehavior>
									<button className={styles.account__buttons__button}>Edit Account</button>
								</Link>
								<DeleteUserComponent id={user.id}/>
							</div>
						</div>
					</div>
				</>
			) : (
				<div><LoadingComponent /></div>
			)}
		</div>
	);
}