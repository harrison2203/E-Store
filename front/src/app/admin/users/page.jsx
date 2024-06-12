'use client';
import React from 'react';
import AsideComponent from '../../../components/AsideComponent';
import FetchUsersAdminComponent from '../../../AdminComponents/FetchUsersAdminComponent'
import styles from '../../styles/UsersAdminPage.module.css';

export default function UsersAdminPage() {
	return (
		<div className={styles.container}>
			<aside className={styles.container__aside}>
				<AsideComponent/>
			</aside>
			<main className={styles.container__main}>
				<div className={styles.user__component}>
					<FetchUsersAdminComponent/>
				</div>
			</main>
		</div>
	)
}