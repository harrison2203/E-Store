import axios from 'axios';
import styles from '../app/styles/DeleteProductAdminComponent.css';
import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { FaTrash } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";


export default function FetchDeleteProduct ({id}) {
	const cookies = new Cookies();
	const router = useRouter();
	const [product, setProduct] = useState(null);
	const token = cookies.get('access_token');


	function	notification (message) {
		let values = Object.values(message);
		return toast(`${values}`)
	}

	const DeleteProduct = async (token, id) => {
		if (!token && !id) {
			console.error('No token found');
      return;
    }
		try {
			console.log("test")
			const response = await axios.delete(`http://localhost:8000/product/delete/${id}/`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			console.log("response delete", response)
			if(response.status === 200){
				notification(response.data);
				setProduct(response.data);
				router.refresh();
			}else {
				console.error("request error")
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	return (
		<div>
			<button className={styles.buttons__item__test} onClick={() => DeleteProduct(token, id)}><FaTrash /></button>
			<ToastContainer />
		</div>
	)
}