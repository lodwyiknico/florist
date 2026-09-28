'use client'

import React from 'react'
import { useCart } from '@shared/context/CartContext'
import styles from './CartDrawer.module.css'

export const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalCount,
    totalPrice,
  } = useCart()

  if (!isCartOpen) return null

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)

  const handleCheckoutWA = () => {
    const itemListText = items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (${item.quantity}x) - ${formatRupiah(item.product.price * item.quantity)}`
      )
      .join('%0A')

    const message = `Halo Florist, saya ingin memesan karangan bunga berikut:%0A%0A${itemListText}%0A%0ATotal: ${formatRupiah(totalPrice)}%0A%0AMohon info ketersediaan dan proses pengirimannya ya!`
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank')
  }

  return (
    <>
      <div className={styles.backdrop} onClick={() => setIsCartOpen(false)} aria-hidden="true" />
      <aside className={styles.drawer} aria-label="Keranjang Belanja">
        <div className={styles.header}>
          <div className={styles.title}>
            <span>🛒 Keranjang Saya</span>
            {totalCount > 0 && <span className={styles.itemCountBadge}>{totalCount} item</span>}
          </div>
          <button
            id="cart-close-button"
            type="button"
            className={styles.closeButton}
            onClick={() => setIsCartOpen(false)}
            aria-label="Tutup Keranjang"
          >
            &times;
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon} aria-hidden="true">
                🌸
              </span>
              <p className={styles.emptyText}>Keranjang belanja Anda masih kosong.</p>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {items.map((item) => (
                <li key={item.product.id} className={styles.itemCard}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className={styles.itemImage}
                    loading="lazy"
                  />
                  <div className={styles.itemDetails}>
                    <div>
                      <h4 className={styles.itemName}>{item.product.name}</h4>
                      <p className={styles.itemPrice}>{formatRupiah(item.product.price)}</p>
                    </div>
                    <div className={styles.itemActions}>
                      <div className={styles.qtyControls}>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Kurang satu"
                        >
                          -
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Tambah satu"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Subtotal:</span>
              <span className={styles.totalAmount}>{formatRupiah(totalPrice)}</span>
            </div>
            <button
              id="cart-checkout-wa-btn"
              type="button"
              className={styles.checkoutBtn}
              onClick={handleCheckoutWA}
            >
              <span>💬 Pesan via WhatsApp</span>
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
