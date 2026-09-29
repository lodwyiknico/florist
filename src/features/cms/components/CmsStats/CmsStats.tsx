import React from 'react'
import type { CatalogStats } from '@features/catalog/context/CatalogContext'
import styles from './CmsStats.module.css'

interface CmsStatsProps {
  stats: CatalogStats
}

export const CmsStats: React.FC<CmsStatsProps> = ({ stats }) => {
  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)

  const cards = [
    {
      title: 'Total Katalog Bunga',
      value: `${stats.total} Produk`,
      subtitle: `${stats.categoriesCount} kategori aktif`,
      icon: '💐',
      accentColor: '#db2777',
      bgGradient: 'linear-gradient(135deg, rgba(219, 39, 119, 0.08) 0%, rgba(244, 114, 182, 0.03) 100%)',
    },
    {
      title: 'Koleksi Best Seller',
      value: `${stats.bestSellers} Produk`,
      subtitle: 'Produk unggulan terlaris',
      icon: '⭐',
      accentColor: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(251, 191, 36, 0.03) 100%)',
    },
    {
      title: 'Rangkaian Baru',
      value: `${stats.newArrivals} Produk`,
      subtitle: 'Katalog rilis terbaru',
      icon: '🌿',
      accentColor: '#10b981',
      bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.03) 100%)',
    },
    {
      title: 'Rata-rata Harga',
      value: formatRupiah(stats.averagePrice),
      subtitle: 'Harga dasar rangkaian',
      icon: '🏷️',
      accentColor: '#6366f1',
      bgGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(129, 140, 248, 0.03) 100%)',
    },
  ]

  return (
    <div className={styles.statsGrid}>
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={styles.statCard}
          style={{ background: card.bgGradient, borderColor: `${card.accentColor}25` }}
        >
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{card.title}</span>
            <span
              className={styles.iconBadge}
              style={{ backgroundColor: `${card.accentColor}18`, color: card.accentColor }}
              aria-hidden="true"
            >
              {card.icon}
            </span>
          </div>
          <div className={styles.cardValue} style={{ color: card.accentColor }}>
            {card.value}
          </div>
          <div className={styles.cardSubtitle}>{card.subtitle}</div>
        </div>
      ))}
    </div>
  )
}
