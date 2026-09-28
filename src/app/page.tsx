'use client'

import Link from 'next/link'
import { FLOWER_PRODUCTS } from '@infrastructure/data/products'
import { useCart } from '@shared/context/CartContext'
import styles from './page.module.css'

export default function HomePage() {
  const { addToCart } = useCart()
  const featuredProducts = FLOWER_PRODUCTS.slice(0, 4)

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <div className={styles.page}>
      <main id="main-content">
        {/* Hero Section */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.badge} id="hero-badge">
            <span aria-hidden="true">✨</span> Toko Bunga Segar &amp; Rangkaian Premium #1
          </div>
          <h1 id="hero-title" className={styles.heroTitle}>
            Rangkaian Bunga Segar Penuh Makna untuk{' '}
            <span className={styles.gradientText}>Setiap Momen Spesial</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Setiap tangkai bunga dirangkai dengan keahlian tangan profesional, kesegaran terjamin,
            dan pengiriman aman tepat waktu di hari yang sama.
          </p>

          <div className={styles.heroCtaGroup}>
            <Link href="/koleksi" id="hero-primary-cta" className={styles.primaryCta}>
              Lihat Katalog Bunga <span>→</span>
            </Link>
            <Link href="/kontak" id="hero-secondary-cta" className={styles.secondaryCta}>
              Konsultasi Rangkaian
            </Link>
          </div>

          {/* Stats Bar */}
          <div className={styles.statsGrid} id="stats-grid">
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15.000+</span>
              <span className={styles.statLabel}>Buket &amp; Karangan Terkirim</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>99.8%</span>
              <span className={styles.statLabel}>Jaminan Kesegaran Bunga</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.9 / 5</span>
              <span className={styles.statLabel}>Kepuasan Pelanggan Setia</span>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className={styles.featuresSection} aria-labelledby="featured-title">
          <div className={styles.sectionHeader}>
            <h2 id="featured-title" className={styles.sectionTitle}>
              Koleksi Favorit Pilihan
            </h2>
            <p className={styles.sectionDesc}>
              Buket bunga yang paling banyak dipesan untuk perayaan berkesan
            </p>
          </div>

          <div className={styles.productGrid}>
            {featuredProducts.map((flower) => (
              <article key={flower.id} className={styles.productCard}>
                <div className={styles.productImageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className={styles.productImage}
                    loading="lazy"
                  />
                  {flower.isBestSeller && (
                    <span className={styles.bestSellerBadge}>Best Seller</span>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productRating}>
                    <span>⭐ {flower.rating.toFixed(1)}</span>
                    <span className={styles.reviewsCount}>({flower.reviewsCount} ulasan)</span>
                  </div>
                  <h3 className={styles.productTitle}>{flower.name}</h3>
                  <p className={styles.productDesc}>{flower.description}</p>
                  <div className={styles.productBottom}>
                    <div className={styles.priceRow}>
                      <span className={styles.productPrice}>{formatRupiah(flower.price)}</span>
                      {flower.originalPrice && (
                        <span className={styles.originalPrice}>
                          {formatRupiah(flower.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      id={`home-pesan-btn-${flower.id}`}
                      type="button"
                      className={styles.detailBtn}
                      onClick={() => addToCart(flower)}
                    >
                      <span>Pesan Sekarang</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/koleksi" className={styles.secondaryCta}>
              Jelajahi Semua Koleksi ({FLOWER_PRODUCTS.length}+ Rangkaian) →
            </Link>
          </div>
        </section>

        {/* Features / Value Proposition */}
        <section
          id="keunggulan"
          className={styles.featuresSection}
          aria-labelledby="features-title"
        >
          <div className={styles.sectionHeader}>
            <h2 id="features-title" className={styles.sectionTitle}>
              Mengapa Memilih Florist?
            </h2>
            <p className={styles.sectionDesc}>
              Komitmen kami menghadirkan keindahan dan kesegaran terbaik ke tangan Anda
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <article className={styles.featureCard} id="feature-card-1">
              <div className={styles.featureIcon} aria-hidden="true">
                🌿
              </div>
              <h3 className={styles.featureCardTitle}>100% Segar Tiap Hari</h3>
              <p className={styles.featureCardDesc}>
                Dipetik langsung dari perkebunan pilihan dengan pendingin khusus agar tetap mekar
                sempurna.
              </p>
            </article>

            <article className={styles.featureCard} id="feature-card-2">
              <div className={styles.featureIcon} aria-hidden="true">
                ⚡
              </div>
              <h3 className={styles.featureCardTitle}>Pengiriman Same-Day</h3>
              <p className={styles.featureCardDesc}>
                Kurir berpengalaman khusus bunga memastikan pesanan sampai dalam kondisi prima dan
                tepat waktu.
              </p>
            </article>

            <article className={styles.featureCard} id="feature-card-3">
              <div className={styles.featureIcon} aria-hidden="true">
                🎨
              </div>
              <h3 className={styles.featureCardTitle}>Kustomisasi Desain</h3>
              <p className={styles.featureCardDesc}>
                Pilih kombinasi warna, jenis bunga, dan kartu ucapan personal sesuai selera penerima
                Anda.
              </p>
            </article>

            <article className={styles.featureCard} id="feature-card-4">
              <div className={styles.featureIcon} aria-hidden="true">
                🛡️
              </div>
              <h3 className={styles.featureCardTitle}>Garansi Kepuasan</h3>
              <p className={styles.featureCardDesc}>
                Bunga layu saat tiba? Kami ganti rangkaian baru 100% tanpa biaya tambahan.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}
