import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@features/auth'
import styles from './CmsHeader.module.css'

interface CmsHeaderProps {
  onAddProduct: () => void
}

export const CmsHeader: React.FC<CmsHeaderProps> = ({ onAddProduct }) => {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.replace('/admin/login')
  }

  return (
    <header className={styles.header}>
      {/* Top Admin User Bar */}
      <div className={styles.adminBar}>
        <div className={styles.userInfo}>
          <span className={styles.userAvatar} aria-hidden="true">
            👤
          </span>
          <div className={styles.userMeta}>
            <span className={styles.userName}>{user?.name || 'Administrator'}</span>
            <span className={styles.userEmail}>{user?.email || 'admin@florist.com'}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className={styles.logoutBtn}
          title="Keluar dari sesi CMS admin"
          id="cms-logout-btn"
        >
          <span aria-hidden="true">🚪</span> Keluar (Logout)
        </button>
      </div>

      <div className={styles.topRow}>
        <div className={styles.titleArea}>
          <div className={styles.badge}>
            <span aria-hidden="true">⚙️</span> Sistem Manajemen Katalog (CMS)
          </div>
          <h1 className={styles.title}>Atur Katalog Rangkaian Bunga</h1>
          <p className={styles.subtitle}>
            Kelola produk bunga segar, atur harga, status best seller, foto produk, dan detail bunga
            yang tampil di toko secara langsung.
          </p>
        </div>

        <div className={styles.actionGroup}>
          <Link href="/koleksi" className={styles.viewStoreBtn}>
            <span aria-hidden="true">👁️</span> Lihat Toko
          </Link>
          <button
            id="cms-add-product-btn"
            type="button"
            className={styles.addBtn}
            onClick={onAddProduct}
          >
            <span aria-hidden="true">➕</span> Tambah Bunga Baru
          </button>
        </div>
      </div>
    </header>
  )
}


