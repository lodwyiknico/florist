import React from 'react'
import type { FlowerProduct } from '@domain/models/FlowerProduct'
import type { CatalogStats } from '@features/catalog/context/CatalogContext'
import { CmsStats } from '../CmsStats/CmsStats'
import styles from './CmsAnalytics.module.css'

interface CmsAnalyticsProps {
  products: FlowerProduct[]
  stats: CatalogStats
  onGoToCatalog: () => void
}

export const CmsAnalytics: React.FC<CmsAnalyticsProps> = ({
  products,
  stats,
  onGoToCatalog,
}) => {

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)

  // Category breakdown
  const categoryCounts = products.reduce(
    (acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const categories = [
    { key: 'buket', label: 'Buket Bunga', color: '#db2777' },
    { key: 'meja', label: 'Bunga Meja & Vas', color: '#2563eb' },
    { key: 'standing', label: 'Standing Flower', color: '#ca8a04' },
    { key: 'wisuda', label: 'Buket Wisuda', color: '#7c3aed' },
    { key: 'anniversary', label: 'Anniversary & Box', color: '#059669' },
  ]

  const bestSellerList = products.filter((p) => p.isBestSeller)
  const minPrice = products.length > 0 ? Math.min(...products.map((p) => p.price)) : 0
  const maxPrice = products.length > 0 ? Math.max(...products.map((p) => p.price)) : 0

  return (
    <div className={styles.analyticsWrapper}>
      {/* Top Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerInfo}>
          <span className={styles.bannerBadge}>📊 Ringkasan Statistik</span>
          <h2 className={styles.bannerTitle}>Dashboard Kinerja Katalog Bunga</h2>
          <p className={styles.bannerDesc}>
            Pantau sebaran koleksi bunga, rata-rata harga pasar, dan status produk unggulan
            secara menyeluruh.
          </p>
        </div>
        <div className={styles.bannerActions}>
          <button
            type="button"
            className={styles.primaryActionBtn}
            onClick={onGoToCatalog}
          >
            📋 Buka Tabel Katalog
          </button>
        </div>

      </div>

      {/* 4 Cards Overview */}
      <CmsStats stats={stats} />

      {/* Split Grid: Categories & Best Sellers */}
      <div className={styles.gridTwoCols}>
        {/* Left: Category Distribution */}
        <div className={styles.cardPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Distribusi Kategori Rangkaian</h3>
            <span className={styles.panelSubtitle}>{products.length} Total Produk</span>
          </div>

          <div className={styles.categoryList}>
            {categories.map((cat) => {
              const count = categoryCounts[cat.key] || 0
              const percentage = products.length > 0 ? Math.round((count / products.length) * 100) : 0

              return (
                <div key={cat.key} className={styles.categoryRow}>
                  <div className={styles.categoryInfo}>
                    <span className={styles.categoryName}>{cat.label}</span>
                    <span className={styles.categoryCount}>
                      {count} produk ({percentage}%)
                    </span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div
                      className={styles.progressBarFill}
                      style={{ width: `${percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Best Sellers Spotlight */}
        <div className={styles.cardPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Koleksi Best Seller Teratas</h3>
            <span className={styles.panelSubtitle}>{bestSellerList.length} Rangkaian Unggulan</span>
          </div>

          {bestSellerList.length === 0 ? (
            <p className={styles.emptyNote}>Belum ada produk yang ditandai sebagai Best Seller.</p>
          ) : (
            <div className={styles.bestSellerList}>
              {bestSellerList.slice(0, 4).map((flower) => (
                <div key={flower.id} className={styles.bestItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className={styles.bestThumb}
                    onError={(e) => {
                      ;(e.target as HTMLElement).style.display = 'none'
                    }}
                  />
                  <div className={styles.bestDetails}>
                    <span className={styles.bestName}>{flower.name}</span>
                    <span className={styles.bestMeta}>
                      ⭐ {flower.rating.toFixed(1)} ({flower.reviewsCount} ulasan) •{' '}
                      {flower.category}
                    </span>
                  </div>
                  <span className={styles.bestPrice}>{formatRupiah(flower.price)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price Range & Quick Metrics */}
      <div className={styles.priceBreakdownCard}>
        <div className={styles.priceStat}>
          <span className={styles.priceStatLabel}>Harga Termurah</span>
          <span className={styles.priceStatVal}>{formatRupiah(minPrice)}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.priceStat}>
          <span className={styles.priceStatLabel}>Rata-rata Harga</span>
          <span className={styles.priceStatVal} style={{ color: '#db2777' }}>
            {formatRupiah(stats.averagePrice)}
          </span>
        </div>
        <div className={styles.divider} />
        <div className={styles.priceStat}>
          <span className={styles.priceStatLabel}>Harga Termahal</span>
          <span className={styles.priceStatVal}>{formatRupiah(maxPrice)}</span>
        </div>
      </div>
    </div>
  )
}
