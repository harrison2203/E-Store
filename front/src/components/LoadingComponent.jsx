import styles from '../app/styles/LoadingComponent.module.css'

export default function Loading() {
	return (
		<main className={styles.loader__container}>
			<div className={styles.loader}></div>
		</main>
	)
}