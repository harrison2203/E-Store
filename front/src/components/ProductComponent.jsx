/* import axios from 'axios';
import React, { useEffect, useState } from "react";
import styles from '../app/styles/FetchProduct.module.css';


export default function FetchProduct({id}) {
	const [product, setProduct] = useState(null);

	useEffect(() => {
			getProduct(id);
		}, [id]
	);

	const getProduct = async (id) => {
		console.log('getproduct', id)
		try {
			const response = await axios.get(`http://localhost:8000/products/${id}/`)
			console.log("response data", response.data);
			setProduct(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
  return (
    <div className={styles.product}>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <img className={styles.product__photos} src={product.photo} alt={product.name} />
          <p>{product.description}</p>
          <p>Prix: {product.price} $</p>
        </>
      ) : (
        <div>Loading.....</div>
      )}
    </div>
  );
}; */

import React from 'react';
import { useProduct } from '../context/ProductContext';
import styles from '../app/styles/FetchProduct.module.css'
import LoadingComponent from './LoadingComponent.jsx';


export default function FetchProduct() {
	const { product, loading } = useProduct()
	console.log("values", product, loading)


  return (
    <div className={styles.product}>
      {product ? (
				<>
					<div className={styles.product__photo}>
          	<img className={styles.product__photo__image} src={product.photo} alt={product.name} />
					</div>
					<div className={styles.product__information}>
						<h1 className={styles.product__name}>{product.name}</h1>
						<p className={styles.product__description}>{product.description}</p>
						<h3 className={styles.product__price}>{product.price} €</h3>
						<div className={styles.button_actions}>
							<button className={styles.product_button}>Ajouter au panier</button>
						</div>
					</div>
      	</>
      ) : (
				<div><LoadingComponent /></div>
      )}
    </div>
  );
};
