'use client';
import React from 'react';
import AsideComponent from '../../../components/AsideComponent';
import styles from '../../styles/ProductsAdminPage.module.css';
import FetchProductsAdminComponent from '../../../AdminComponents/FetchProductsAdminComponent';
import { ProductsProvider } from '../../../context/ProductsContext';


export default function ProductAdminPage() {
	return (
		<div className={styles.container}>
			<aside className={styles.container__aside}>
				<AsideComponent/>
			</aside>

			<main className={styles.container__main}>
				<div>
					<ProductsProvider>
						<div className={styles.product__component}>
							<FetchProductsAdminComponent/>
						</div>
					</ProductsProvider>
				</div>
			</main>
		</div>
	)
}
