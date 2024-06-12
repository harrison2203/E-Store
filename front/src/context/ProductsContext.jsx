import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductsContext = createContext();


export function ProductsProvider({ children }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
			fetchProducts();
	}, []);

	async function fetchProducts() {
		try {
			setLoading(true);
			const response = await axios.get(`http://localhost:8000/products/`);
			if (response.data && Array.isArray(response.data['The producs are'])) {
					setProducts(response.data['The producs are']);
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
		<ProductsContext.Provider value={{ products, loading }}>
				{children}
		</ProductsContext.Provider>
	);
};

export function useProducts() {
	const context = React.useContext(ProductsContext);
	if (!context) {
			throw new Error('useProducts must be used within a ProductsProvider');
	}
	return context;
};
