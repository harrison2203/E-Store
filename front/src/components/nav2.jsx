"use client"
import React from 'react'
import Cookies from 'universal-cookie';
import { GiCoffeeBeans } from "react-icons/gi";
import Link from 'next/link';
import styles from '../app/styles/Nav.module.css';


export default function nav2() {
	const cookies = new Cookies();
	const userInfo = cookies.get('user_info')
	console.log('info values', userInfo.is_super_user);

	return (
        <nav className={styles.main}>
			<GiCoffeeBeans />
			<Link href={'/'} legacyBehavior>
			<p>home</p>
			</Link>
		</nav>
    );
}