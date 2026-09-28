import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

const CURRENT_YEAR = 2026

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandCol}>
          <div className={styles.brandTitle}>
            <span>🌸</span>
            <span>Florist Indonesia</span>
          </div>
          <p className={styles.brandDesc}>
            Menghadirkan keindahan rangkaian bunga segar premium untuk merayakan setiap detik
            berharga dalam hidup Anda.
          </p>
        </div>

        <div>
          <h4 className={styles.colTitle}>Menu Utama</h4>
          <ul className={styles.linksList}>
            <li>
              <Link href="/" className={styles.linkItem}>
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/koleksi" className={styles.linkItem}>
                Katalog Bunga
              </Link>
            </li>
            <li>
              <Link href="/tentang" className={styles.linkItem}>
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/kontak" className={styles.linkItem}>
                Kontak &amp; Custom
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.colTitle}>Kategori Bunga</h4>
          <ul className={styles.linksList}>
            <li>
              <Link href="/koleksi?kategori=buket" className={styles.linkItem}>
                Buket Bunga
              </Link>
            </li>
            <li>
              <Link href="/koleksi?kategori=meja" className={styles.linkItem}>
                Bunga Meja &amp; Vas
              </Link>
            </li>
            <li>
              <Link href="/koleksi?kategori=standing" className={styles.linkItem}>
                Standing Flower
              </Link>
            </li>
            <li>
              <Link href="/koleksi?kategori=wisuda" className={styles.linkItem}>
                Buket Wisuda
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.colTitle}>Layanan Pelanggan</h4>
          <ul className={styles.linksList}>
            <li>
              <span className={styles.linkItem}>📍 Jakarta &amp; Sekitarnya</span>
            </li>
            <li>
              <span className={styles.linkItem}>⏰ Buka Setiap Hari (08:00 - 21:00)</span>
            </li>
            <li>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}
              >
                💬 WhatsApp: 0812-3456-7890
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {CURRENT_YEAR} Florist App. Seluruh Hak Cipta Dilindungi.</p>
        <p>Pengiriman Cepat &bull; Bunga Segar 100% &bull; Garansi Tiba Aman</p>
      </div>
    </footer>
  )
}
