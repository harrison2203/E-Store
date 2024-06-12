import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useProduct } from '../context/ProductContext';
import styles from '../app/styles/UpdateProductComponent.module.css';


export default function UpdateProduct({id}) {

	//const { product, loading } = useProduct()
	//console.log("product values", product);
	const cookies = new Cookies();
	const token = cookies.get('access_token');
	const [name, setProductName] = useState('');
	const [photo, setPhoto] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');

	const EditProduct = async (token, id) => {
		if (!token && !id) {
			console.error('No token or id found');
			return;
		}
		try {
			const response = await axios.put(`http://localhost:8000/products/update/${id}/`, {
        name,
        photo,
        description,
        price,
			}, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			console.log('requeste response', response)
			if(response.status === 200){
				console.log("SUCCESS")
			}else {
				console.error('request error')
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	return (
		<div>
			<h1>Update Product</h1>
			<label htmlFor='name'>
				Name
				<input
					type='text'
					id='name'
					name='name'
					value={name}
					onChange={(e) => setProductName(e.target.value)}
				/>
			</label>
			<label htmlFor='photo'>
				Photo
				<input
					type='text'
					id='photo'
					name='photo'
					value={photo}
					onChange={(e) => setPhoto(e.target.value)}
				/>
			</label>
			<label htmlFor='description'>
				Description
				<input
					type='text'
					id='description'
					name='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</label>
			<label htmlFor='price'>
				Price
				<input
					type='text'
					id='price'
					name='price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					/>
			</label>
					<button onClick={() => EditProduct(token, id)}>Update product</button>
	</div>
	)
}