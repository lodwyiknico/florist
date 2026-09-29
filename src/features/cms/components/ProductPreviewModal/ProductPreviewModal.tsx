import React from 'react'
import type { FlowerProduct } from '@domain/models/FlowerProduct'
import styles from './ProductPreviewModal.module.css'

interface ProductPreviewModalProps {
  isOpen: boolean
  product: FlowerProduct | null
  onClose: () => void
}

export const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({
  isOpen,
  product,
  onClose,
}) => {
  if (!isOpen || !product) return null

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.badgeLabel}>Pratinjau Toko (Customer View)</span>
            <h3 id="preview-modal-title" className={styles.title}>
              {product.name}
            </h3>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Tutup pratinjau"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.cardPreview}>
            <div className={styles.imageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80'
                }}
              />
              <div className={styles.badgesWrapper}>
                {product.isBestSeller && <span className={styles.bestSellerBadge}>Best Seller</span>}
                {product.isNew && <span className={styles.newBadge}>Baru</span>}
              </div>
            </div>

            <div className={styles.content}>
              <div className={styles.categoryPill}>Kategori: {product.category.toUpperCase()}</div>

              <div className={styles.ratingRow}>
                <span className={styles.stars}>⭐ {product.rating.toFixed(1)}</span>
                <span className={styles.reviews}>({product.reviewsCount} ulasan pembeli)</span>
              </div>

              <h4 className={styles.productName}>{product.name}</h4>
              <p className={styles.description}>{product.description}</p>

              <div className={styles.sectionLabel}>Bunga yang Disertakan:</div>
              <div className={styles.flowersList}>
                {product.flowersIncluded.map((f, i) => (
                  <span key={i} className={styles.flowerTag}>
                    🌸 {f}
                  </span>
                ))}
              </div>

              {product.tags && product.tags.length > 0 && (
                <>
                  <div className={styles.sectionLabel}>Tag Produk:</div>
                  <div className={styles.tagsList}>
                    {product.tags.map((t, i) => (
                      <span key={i} className={styles.tagBadge}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <div className={styles.footerRow}>
                <div className={styles.priceContainer}>
                  <span className={styles.priceText}>{formatRupiah(product.price)}</span>
                  {product.originalPrice && (
                    <span className={styles.originalPriceText}>
                      {formatRupiah(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className={styles.dummyBtn}>Simulasi Pesan Sekarang</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
