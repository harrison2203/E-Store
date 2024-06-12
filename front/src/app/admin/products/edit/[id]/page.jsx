'use client';
import UpdateProductAdminComponent from '../../../../../AdminComponents/UpdateProductAdminComponent';
import { ProductProvider } from '../../../../../context/ProductContext';

export default function EditProductPage ({params}) {
	const { id } = params;

	return (
		<div>
			<p>The product id is <b>{id}</b></p>

			<ProductProvider id={id}>
				<UpdateProductAdminComponent id={id}/>
			</ProductProvider>
		</div>

	)
}