"use client";
import styles from "./styles/page.module.css";
import FetchProducts from "../components/ProductsComponent";
import { ProductsProvider } from "../context/ProductsContext";
import RootLayout from "./layout";

export default function Home({pageProps}) {
	return (
		<RootLayout index={0}>
			<main className={styles.main}>
					<div>
						<ProductsProvider>
							<FetchProducts {...pageProps}/>
						</ProductsProvider>
					</div>
			</main>
		</RootLayout>
	);
}
