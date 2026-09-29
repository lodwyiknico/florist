'use client'

import React, { useMemo, useState } from 'react'
import type { FlowerCategory, FlowerProduct } from '@domain/models/FlowerProduct'
import { useCatalog } from '@features/catalog/context/CatalogContext'
import { useCart } from '@shared/context/CartContext'
import styles from './koleksi.module.css'

export default function KoleksiPage() {
  const { products } = useCatalog()
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<FlowerCategory>('semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'populer' | 'termurah' | 'termahal' | 'rating'>('populer')

  const categories: { key: FlowerCategory; label: string }[] = [
    { key: 'semua', label: 'Semua Rangkaian' },
    { key: 'buket', label: 'Buket Bunga' },
    { key: 'meja', label: 'Bunga Meja & Vas' },
    { key: 'standing', label: 'Standing Flower' },
    { key: 'wisuda', label: 'Buket Wisuda' },
    { key: 'anniversary', label: 'Anniversary & Box' },
  ]

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchCat = selectedCategory === 'semua' || product.category === selectedCategory
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flowersIncluded.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchCat && matchSearch
    })


    if (sortBy === 'termurah') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'termahal') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    } else {
      // Populer: best seller first, then reviewsCount
      result = [...result].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
    }

    return result
  }, [products, selectedCategory, searchQuery, sortBy])


  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>
          <span aria-hidden="true">💐</span> Katalog Rangkaian Segar
        </div>
        <h1 className={styles.title}>Koleksi Bunga Florist</h1>
        <p className={styles.subtitle}>
          Pilih berbagai rangkaian buket, bunga vas meja, dan standing flower berkualitas tinggi
          dengan pengiriman cepat di hari yang sama.
        </p>
      </header>

      {/* Controls Bar */}
      <section className={styles.controlsBar} aria-label="Filter dan Pencarian">
        <div className={styles.searchAndSort}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon} aria-hidden="true">
              🔍
            </span>
            <input
              id="koleksi-search-input"
              type="text"
              placeholder="Cari nama bunga, mawar, tulip, peony..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <select
            id="koleksi-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className={styles.sortSelect}
            aria-label="Urutkan produk"
          >
            <option value="populer">Paling Populer</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="termurah">Harga: Terendah ke Tertinggi</option>
            <option value="termahal">Harga: Tertinggi ke Terendah</option>
          </select>
        </div>

        <ul className={styles.categoriesList}>
          {categories.map((cat) => (
            <li key={cat.key}>
              <button
                type="button"
                className={`${styles.categoryBtn} ${
                  selectedCategory === cat.key ? styles.categoryActive : ''
                }`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Product Grid */}
      <section aria-label="Daftar Bunga">
        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon} aria-hidden="true">
              🥀
            </span>
            <h3>Tidak Ada Bunga yang Cocok</h3>
            <p>Coba gunakan kata kunci pencarian yang lain atau ganti filter kategori.</p>
            <button
              type="button"
              className={styles.categoryBtn}
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('semua')
              }}
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {filteredProducts.map((flower: FlowerProduct) => (
              <article key={flower.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className={styles.image}
                    loading="lazy"
                  />
                  {flower.isBestSeller && <span className={styles.badgeTag}>Best Seller</span>}
                  {!flower.isBestSeller && flower.isNew && (
                    <span className={styles.badgeTag} style={{ background: '#10b981' }}>
                      Baru
                    </span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.ratingRow}>
                    <span>⭐ {flower.rating.toFixed(1)}</span>
                    <span className={styles.reviewsText}>({flower.reviewsCount} ulasan)</span>
                  </div>

                  <h3 className={styles.cardTitle}>{flower.name}</h3>
                  <p className={styles.cardDesc}>{flower.description}</p>

                  <div className={styles.flowersList}>
                    {flower.flowersIncluded.map((item, idx) => (
                      <span key={idx} className={styles.flowerChip}>
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.priceWrapper}>
                      <span className={styles.price}>{formatRupiah(flower.price)}</span>
                      {flower.originalPrice && (
                        <span className={styles.originalPrice}>
                          {formatRupiah(flower.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      id={`add-to-cart-${flower.id}`}
                      type="button"
                      className={styles.addBtn}
                      onClick={() => addToCart(flower)}
                    >
                      <span>+ Keranjang</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
