import styles from '../app/styles/AsideComponent.module.css'
import React from "react";
import { GrUserSettings } from "react-icons/gr";
import { MdOutlineDashboard } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import Link from 'next/link';

export default function AdminDashboard() {
	return (
        <main className={styles.main__aside}>
			<aside className={styles.layout}>
				<ul className={styles.general__list}>
						<Link href={`/`} legacyBehavior>
					<li className={styles.list_item}>
						<a className={styles.item_logo}><IoHomeOutline /></a>
						<a className={styles.item__title}>Home</a>
					</li>
						</Link>
						<Link href={`/admin/users/`} legacyBehavior>
					<li className={styles.list_item}>
						<a className={styles.item_logo}><GrUserSettings/></a>
						<a className={styles.item__title}>Users</a>
					</li>
						</Link>
						<Link href={`/admin/products/`} legacyBehavior>
					<li className={styles.list_item}>
						<a className={styles.item_logo}><MdOutlineDashboard/></a>
						<a className={styles.item__title}>Products</a>
					</li>
						</Link>
				</ul>
			</aside>
		</main>
  	);
}