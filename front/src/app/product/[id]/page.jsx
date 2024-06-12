"use client"
import React from "react";
import FetchProduct from '../../../components/ProductComponent';
import { ProductProvider } from '../../../context/ProductContext';
import RootLayout from "../../layout";

export default function ProductDetails({params}) {
	const { id } = params;

	return (
		<div>
			<RootLayout index={1}>
				<ProductProvider id={id}>
					<FetchProduct/>
				</ProductProvider>
			</RootLayout>
		</div>
	);
};
