import React from 'react';
import DeleteProductAdminComponent from '../AdminComponents/DeleteProductAdminComponent';
import styles from '../app/styles/FetchProductsAdmin.module.css'
import { useProducts } from '../context/ProductsContext';
import { BsFillPencilFill } from "react-icons/bs";
import LoadingComponent from '../components/LoadingComponent.jsx';
import Link from 'next/link';


export default function FetchProducts() {
	const { products, loading } = useProducts();

	if (loading) {
		return <LoadingComponent/>;
	}
	return (
        <main>
				{products ? (
						<div className={styles.table_container}>
							<div className={styles.table__title}>
								<h1 className={styles.table__title__title}>Products</h1>
								<Link href={'/admin/products/create/'} legacyBehavior>
									<button className={styles.table__title__button}>Create</button>
								</Link>
							</div>
							<table className={styles.table}>
								<thead className={styles.table__head}>
									<tr>
										<th>ID</th>
										<th>NAME</th>
										<th>PHOTO</th>
										<th>DESCRIPTION</th>
										<th>PRICE</th>
										<th>ACTIONS</th>
									</tr>
								</thead>
								<tbody className={styles.table__body}>
									{products.map(product => (
										<tr className={styles.tr} key={product.pk}>
											<td>{product.pk}</td>
											<td>{product.fields.name}</td>
											<td className={styles.photos__table}>
											<img src={product.fields.photo} alt={product.name} /></td>
											<td>{product.fields.description}</td>
											<td>{product.fields.price}</td>
											<div className={styles.general__buttons}>
												<Link href={`/admin/products/edit/${product.pk}/`} legacyBehavior>
													<button className={styles.buttons_item}><BsFillPencilFill /></button>
												</Link>
													<DeleteProductAdminComponent id={product.pk}/>
											</div>
										</tr>
									))}
								</tbody>
							</table>
						</div>
			) : (
				<div className={styles.loadingContainer}>
					<LoadingComponent />
				</div>
			)}
		</main>
    );
};
