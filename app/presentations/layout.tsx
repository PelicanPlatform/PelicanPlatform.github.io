import styles from '../page.module.css'

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <main className={styles.pages}>
            {children}
        </main>
    )
}