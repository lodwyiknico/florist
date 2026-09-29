import React from 'react'
import type { FlowerProduct } from '@domain/models/FlowerProduct'
import styles from './DeleteConfirmModal.module.css'

interface DeleteConfirmModalProps {
  isOpen: boolean
  product: FlowerProduct | null
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  product,
  isDeleting,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !product) return null

  return (
    <div
      className={styles.overlay}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconCircle} aria-hidden="true">
          🗑️
        </div>

        <h3 id="delete-modal-title" className={styles.title}>
          Hapus Rangkaian Bunga?
        </h3>

        <p className={styles.desc}>
          Apakah Anda yakin ingin menghapus produk <strong>"{product.name}"</strong>? Tindakan ini
          tidak dapat dibatalkan dan produk akan hilang dari katalog storefront.
        </p>

        <div className={styles.productSummary}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className={styles.thumb}
            onError={(e) => {
              ;(e.target as HTMLElement).style.display = 'none'
            }}
          />
          <div className={styles.summaryInfo}>
            <span className={styles.summaryName}>{product.name}</span>
            <span className={styles.summaryMeta}>
              ID: {product.id} • Kategori: {product.category}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
            disabled={isDeleting}
          >
            Batal
          </button>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Menghapus...' : 'Ya, Hapus Produk'}
          </button>
        </div>
      </div>
    </div>
  )
}
