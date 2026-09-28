import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main id="not-found-main" className={styles.container}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Halaman Tidak Ditemukan</h1>
      <p className={styles.message}>
        Halaman yang Anda cari tidak ada atau mungkin telah dipindahkan.
      </p>
      <Link id="not-found-home-link" href="/" className={styles.link}>
        ← Kembali ke Beranda
      </Link>
    </main>
  )
}
