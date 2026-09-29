import React from 'react'
import Link from 'next/link'
import type { AdminUser } from '@features/auth'
import type { CmsTab } from '@features/cms/types'
import { FloristLogo } from '@shared/components/FloristLogo/FloristLogo'
import styles from './CmsSidebar.module.css'

interface CmsSidebarProps {
  isOpen: boolean
  onToggle: () => void
  activeTab: CmsTab
  onSelectTab: (tab: CmsTab) => void
  user: AdminUser | null
  onLogout: () => void
}

export const CmsSidebar: React.FC<CmsSidebarProps> = ({
  isOpen,
  onToggle,
  activeTab,
  onSelectTab,
  user,
  onLogout,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`${styles.mobileBackdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={onToggle}
        aria-hidden="true"
      />

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarCollapsed}`}
        aria-label="Sidebar Navigasi CMS"
      >
        {/* Brand & Toggle Header */}
        <div className={styles.brandSection}>
          <div className={styles.brandRow}>
            <div className={styles.brandLogo}>
              <FloristLogo size={32} />
              {isOpen && (
                <div className={styles.brandTitles}>
                  <span className={styles.brandName}>Florist</span>
                  <span className={styles.brandBadge}>CMS Admin</span>
                </div>
              )}
            </div>

            <button
              type="button"
              className={styles.toggleBtn}
              onClick={onToggle}
              aria-label={isOpen ? 'Tutup sidebar menu' : 'Buka sidebar menu'}
              id="cms-sidebar-toggle-btn"
            >
              {isOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        {/* Main Navigation Menu */}
        <nav className={styles.navSection}>

          <div className={styles.menuLabel}>{isOpen ? 'MENU UTAMA' : '•••'}</div>

          <ul className={styles.navList}>
            {/* Tab: Daftar Katalog */}
            <li>
              <button
                type="button"
                className={`${styles.navItem} ${activeTab === 'katalog' ? styles.navItemActive : ''}`}
                onClick={() => onSelectTab('katalog')}
                title="Daftar Katalog Bunga"
                id="cms-tab-katalog-btn"
              >
                <span className={styles.navIcon} aria-hidden="true">
                  💐
                </span>
                {isOpen && (
                  <>
                    <span className={styles.navLabel}>Daftar Katalog</span>
                  </>
                )}
              </button>
            </li>

            {/* Tab: Ringkasan & Metrik */}
            <li>
              <button
                type="button"
                className={`${styles.navItem} ${activeTab === 'stats' ? styles.navItemActive : ''}`}
                onClick={() => onSelectTab('stats')}
                title="Ringkasan & Metrik Toko"
                id="cms-tab-stats-btn"
              >
                <span className={styles.navIcon} aria-hidden="true">
                  📊
                </span>
                {isOpen && <span className={styles.navLabel}>Ringkasan &amp; Metrik</span>}
              </button>
            </li>
          </ul>

          <div className={styles.menuLabel} style={{ marginTop: '1.5rem' }}>
            {isOpen ? 'TAUTAN TOKO' : '•••'}
          </div>

          <ul className={styles.navList}>
            {/* View Store */}
            <li>
              <Link
                href="/koleksi"
                className={styles.navLinkItem}
                title="Lihat Etalase Toko"
                id="cms-sidebar-view-store"
              >
                <span className={styles.navIcon} aria-hidden="true">
                  🛍️
                </span>
                {isOpen && (
                  <>
                    <span className={styles.navLabel}>Lihat Toko</span>
                    <span className={styles.externalArrow}>↗</span>
                  </>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer: User Profile & Logout */}
        <div className={styles.footerSection}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar} aria-hidden="true">
              👤
            </div>
            {isOpen && (
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user?.name || 'Administrator'}</span>
                <span className={styles.userRole}>Superadmin</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onLogout}
            className={styles.logoutBtn}
            title="Keluar dari sesi admin"
            id="cms-sidebar-logout-btn"
          >
            <span className={styles.navIcon} aria-hidden="true">
              🚪
            </span>
            {isOpen && <span className={styles.logoutText}>Keluar (Logout)</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
