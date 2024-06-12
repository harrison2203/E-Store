"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { SlBasket } from "react-icons/sl";
import { TfiMenu } from "react-icons/tfi";
import Cookies from 'universal-cookie';
import Link from 'next/link';
import styles from '../app/styles/Nav.module.css';


export default function Nav() {
	const cookies = new Cookies();
	const userInfo = cookies.get('user_info');
	const { id, username, is_super_user } = userInfo || {}
	console.log("user values", userInfo);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	console.log('user values', userInfo);

	useEffect(() => {
		if (userInfo) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [userInfo]);

	const handleLogOut = () => {
		const deleteCookie = cookies.remove('access_token');
		const deleteUser = cookies.remove('user_info');
		if (!deleteCookie && !deleteUser) {
			setIsLoggedIn(false);
			console.log("Logout correctly");
		} else {
			console.log("A problem happened during logout");
		}
	}
	return (
		<nav className={styles.main}>
				<div className={styles.image}>
						<img className={styles.logo} src={'https://res.cloudinary.com/didthhgmq/image/upload/v1717838231/Pexels_risn2d.png'}/>
				</div>
				<div className={styles.input}>
						<input className={styles.input__item}></input>
				</div>
				<div className={styles.dropdown}>
					<button className={styles.dropdown__button}><TfiMenu/></button>
						<div id="myDropdown" className={styles.dropdown__content}>
							{isLoggedIn ? (
								<>
									<a href={'/'}onClick={handleLogOut}>Logout</a>
									{is_super_user ? (
										<Link href={"/admin/products"}>
											Admin
										</Link>
									) : (
										<Link href={`/account/${id}`}>
											Account
										</Link>
									)}
								</>
							) : (
									<Link  href="/login">
											Login
									</Link>
							)}
							{/* <a href="#">{isLoggedIn ? 'Logout' : 'Login'}</a> */}
							<a href="#">About</a>
							<a href="#">FAQ</a>
						</div>
				</div>
				<div className={styles.navbar__basket}>
						<div className={styles.basket__icon}>
						<SlBasket className={styles.basket__icon__color} />
						</div>
				</div>
		</nav>
	);
}


	// return (
	// 	<nav className={styles.main}>
	// 		<GiCoffeeBeans />
	// 		{userInfo.is_super_user ? (
	// 			<Link href={'/admin/users/'}>
	// 				<button>Admin Dashboard</button>
	// 			</Link>
	// 		) : (
	// 			<Link href={`/account/${userInfo.id}/`}>
	// 				<button>User account</button>
	// 			</Link>
	// 		)
	// 		}
	// 	</nav>
	// )
	// return (
	// 	<nav className={styles.main}>
	// 		<GiCoffeeBeans />
	// 		{user ? (
	// 			user.isAdmin ? (
	// 				<button>Admin Account</button>
	// 			) : (
	// 				<Link href={`/`}>
	// 					<button>User Account</button>
	// 				</Link>
	// 			)
	// 		) : (
	// 			<p>Failed to load user data</p>
	// 		)}
	// 	</nav>
	// );


// "use client"
// import React from 'react'
// import { useUser } from '../context/UserContext';
// import { FaShoppingCart } from "react-icons/fa";
// import { GiCoffeeBeans } from "react-icons/gi";
// import Link from 'next/link';
// import styles from '../app/styles/Nav.module.css';
// import Cookies from 'universal-cookie';


// export default function Nav() {
// 	const cookies = new Cookies();
// 	const decodedToken = cookies.get('user_info');
// 	const { user, loading } = useUser();

// 	if(user) {
// 		console.log('test test')
// 		console.log('user values', user)
// 	}
// 	console.log(decodedToken, 'tokendécodé');
// 	const {id, username, is_super_user} = decodedToken || {};

// 	return (
// 		<nav className={styles.main}>
// 			<GiCoffeeBeans />
// 			{decodedToken ? (
// 				<>
// 					<p>{username}</p>
// 					<div>
// 						{is_super_user ? (
// 							<Link href={`/admin/users/`}>
// 								<button>Admin Account</button>
// 							</Link>
// 						) : (
// 							<Link href={`/account/${id}/`}>
// 								<button>User Account</button>
// 							</Link>
// 						)}
// 					</div>
// 				</>
// 			) : (
// 				<p></p>
// 			)}
// 		</nav>
// 	)
// }