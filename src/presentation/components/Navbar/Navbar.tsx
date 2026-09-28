'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@shared/context/CartContext'
import styles from './Navbar.module.css'

export const Navbar = () => {
  const pathname = usePathname()
  const { totalCount, setIsCartOpen } = useCart()

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/koleksi', label: 'Katalog Bunga' },
    { href: '/tentang', label: 'Tentang Kami' },
    { href: '/kontak', label: 'Kontak & Custom' },
  ]

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer} aria-label="Navigasi Utama">
        <Link href="/" id="nav-brand-logo" className={styles.logo}>
          <span className={styles.logoIcon} aria-hidden="true">
            🌸
          </span>
          <span className={styles.logoText}>Florist</span>
        </Link>

        <ul className={styles.navLinks}>
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className={styles.navActions}>
          <button
            id="nav-cart-button"
            type="button"
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
            aria-label={`Keranjang belanja, ${totalCount} item`}
          >
            <span>🛒</span>
            {totalCount > 0 && <span className={styles.cartBadge}>{totalCount}</span>}
          </button>
          <Link href="/kontak" id="nav-order-cta" className={styles.orderCta}>
            Pesan Sekarang
          </Link>
        </div>
      </nav>
    </header>
  )
}
