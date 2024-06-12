import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import styles from '../app/styles/CreateProduct.module.css';
import { useRouter } from "next/navigation";


export default function CreateProduct() {
	const cookies = new Cookies();
	const router = useRouter();
	const [name, setName] = useState("");
	const [photo, setPhoto] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState('');
	const token = cookies.get('access_token');


	const handleSubmit = async (e, token) => {
		//e.preventDefault();
		const formData = new FormData();
		formData.append('name', name);
		formData.append('photo', photo);
		formData.append('description', description);
		formData.append('price', price);
		try {
			const response = await axios.post('http://localhost:8000/create-product/', formData,
			{
				headers: { 
					"Content-Type": "multipart/form-data" ,
					Authorization: `Bearer ${token}`,
				},
			});
			console.log('response', response)
			if (response.status === 201) {
				console.log("product created")
			} else {
				console.error('Error detected');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			console.error('error response data', error.response.data);
		}
	}
	return (
		<main className={styles.create__container}>
			<div className={styles.create__title__container}>
				<h1 className={styles.create__title}>Create Product</h1>
			</div>
			<form className={styles.create__form}onSubmit={(e) => handleSubmit(e, token)}>
			<label className={styles.create__label} htmlFor="name">
				Name
				<input className={styles.create__input}
					type="text"
					id="name"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<label className={styles.create__label} htmlFor="photo">
				Photo
				<input className={styles.create__input}
					type="text"
					id="photo"
					name="photo"
					value={photo}
					onChange={(e) => setPhoto(e.target.value)}
				/>
			</label>
			<label className={styles.create__label} htmlFor="description">
				Description
				<input className={styles.create__input}
					type="text"
					id="description"
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				</label>
			<label className={styles.create__label} htmlFor="price">
				Price
				<input className={styles.create__input}
					type="price"
					id="price"
					name="price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					/>
			</label>
				<button className={styles.create__button} type="submit">Create Product</button>
			</form>
	</main>
	);
}
