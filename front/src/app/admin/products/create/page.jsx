'use client';
import React from 'react';
import AsideComponent from '../../../../components/AsideComponent';
import CreateProductAdminComponent from '../../../../AdminComponents/CreateProductAdminComponent';
import styles from '../../../styles/ProductsAdminPage.module.css';


export default function CreateProductAdmin() {

	return (
		<div className={styles.container}>
			<aside className={styles.container__aside}>
				<AsideComponent/>
			</aside>

			<main className={styles.container__main}>
				<div>
					<CreateProductAdminComponent/>
				</div>
			</main>
		</div>
	)
}