import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const ProductContext = createContext();


export function ProductProvider({children, id}) {
	console.log("provider id", id)
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
			getProduct(id);
		}, [id]
	);

	async function getProduct(id) {
		console.log('getproduct', id)
		try {
			setLoading(true);
			const response = await axios.get(`http://localhost:8000/products/${id}/`)
			if (response.status === 200) {
				console.log("response data", response.data);
				setProduct(response.data);
			} else {
				console.error('Response data does not have expected structure');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<ProductContext.Provider value={{ product, loading }}>
				{children}
		</ProductContext.Provider>
	);
};

export function useProduct() {
	const context = React.useContext(ProductContext);
	if (!context) {
			throw new Error('useProduct must be used within a ProductProvider');
	}
	return context;
};