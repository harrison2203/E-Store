import React from 'react';
import { useProducts } from '../context/ProductsContext';
import styles from '../app/styles/FetchProducts.module.css';
import LoadingComponent from './LoadingComponent.jsx';
import Link from 'next/link';


export default function FetchProducts() {
	const { products, loading } = useProducts();
	console.log("values", products, loading)

	if (loading) {
		return <LoadingComponent/>;
	}

	return (
		<main className={styles.general}>
			<div className={styles.container}>
				<ul className={styles.products}>
					{products.map(product => (
						<li className={styles.products__card} key={product.pk}>
							<Link href={`/product/${product.pk}/`}>
								<img className={styles.card__photo} src={product.fields.photo} />
									<div className={styles.card__information}>
										<h3 className={styles.card__name}>{product.fields.name}</h3>
										<h4 className={styles.card__price}> {product.fields.price} €</h4>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
