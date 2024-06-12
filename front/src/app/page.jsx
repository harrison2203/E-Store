"use client";
import styles from "./styles/page.module.css";
import FetchProducts from "../components/ProductsComponent";
import { ProductsProvider } from "../context/ProductsContext";
import RootLayout from "./layout";

export default function Home({pageProps}) {
	return (
		<main className={styles.main}>
			<RootLayout index={0}>
			</RootLayout>
				<div>
					<ProductsProvider>
						<FetchProducts {...pageProps}/>
					</ProductsProvider>
				</div>
		</main>
	);
}
