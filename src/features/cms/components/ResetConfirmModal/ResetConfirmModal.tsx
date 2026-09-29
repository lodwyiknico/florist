import React from 'react'
import styles from './ResetConfirmModal.module.css'

interface ResetConfirmModalProps {
  isOpen: boolean
  isResetting: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  isResetting,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  return (
    <div
      className={styles.overlay}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconCircle} aria-hidden="true">
          🔄
        </div>

        <h3 id="reset-modal-title" className={styles.title}>
          Reset Katalog ke Data Awal?
        </h3>

        <p className={styles.desc}>
          Semua produk kustom yang Anda tambahkan atau edit akan dikembalikan ke 8 rangkaian bunga
          bawaan (mock seed). Data produk kustom akan terhapus dari browser ini.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
            disabled={isResetting}
          >
            Batal
          </button>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={onConfirm}
            disabled={isResetting}
          >
            {isResetting ? 'Mereset...' : 'Ya, Reset ke Default'}
          </button>
        </div>
      </div>
    </div>
  )
}
