import React from 'react'
import type { ToastMessage } from '@features/cms/types'
import styles from './CmsToast.module.css'

interface CmsToastProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export const CmsToast: React.FC<CmsToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null

  return (
    <div className={styles.toastContainer} aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => {
        const icon =
          toast.type === 'success' ? '✅' : toast.type === 'error' ? '⚠️' : 'ℹ️'
        return (
          <div
            key={toast.id}
            className={`${styles.toastItem} ${styles[toast.type]}`}
            role="status"
          >
            <span className={styles.toastIcon} aria-hidden="true">
              {icon}
            </span>
            <span className={styles.toastText}>{toast.text}</span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => onDismiss(toast.id)}
              aria-label="Tutup notifikasi"
            >
              ✕
            </button>
          </div>
        )
      })}
    </div>
  )
}
