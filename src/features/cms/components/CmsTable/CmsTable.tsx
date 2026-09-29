import React, { useMemo, useState } from 'react'
import type { FlowerCategory, FlowerProduct } from '@domain/models/FlowerProduct'
import type { CmsFilterStatus, CmsSortOption } from '@features/cms/types'
import styles from './CmsTable.module.css'

interface CmsTableProps {
  products: FlowerProduct[]
  onAddProduct: () => void
  onEditProduct: (product: FlowerProduct) => void
  onDeleteProduct: (product: FlowerProduct) => void
  onPreviewProduct: (product: FlowerProduct) => void
  onToggleBestSeller: (product: FlowerProduct) => void
  onToggleNew: (product: FlowerProduct) => void
}

export const CmsTable: React.FC<CmsTableProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onPreviewProduct,
  onToggleBestSeller,
  onToggleNew,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<FlowerCategory>('semua')
  const [selectedStatus, setSelectedStatus] = useState<CmsFilterStatus>('semua')
  const [sortBy, setSortBy] = useState<CmsSortOption>('terbaru')

  const categories: { key: FlowerCategory; label: string }[] = [
    { key: 'semua', label: 'Semua Kategori' },
    { key: 'buket', label: 'Buket Bunga' },
    { key: 'meja', label: 'Bunga Meja & Vas' },
    { key: 'standing', label: 'Standing Flower' },
    { key: 'wisuda', label: 'Buket Wisuda' },
    { key: 'anniversary', label: 'Anniversary & Box' },
  ]

  const filteredProducts = useMemo(() => {
    let result = products.filter((item) => {
      // Category filter
      const matchCategory = selectedCategory === 'semua' || item.category === selectedCategory

      // Status filter
      const matchStatus =
        selectedStatus === 'semua' ||
        (selectedStatus === 'best-seller' && item.isBestSeller) ||
        (selectedStatus === 'baru' && item.isNew)

      // Search filter
      const q = searchQuery.toLowerCase().trim()
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.flowersIncluded.some((f) => f.toLowerCase().includes(q)) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.id.toLowerCase().includes(q)

      return matchCategory && matchStatus && matchSearch
    })

    // Sort
    if (sortBy === 'harga-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'harga-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'nama-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'rating-desc') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [products, searchQuery, selectedCategory, selectedStatus, sortBy])

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <div>
      <div className={styles.addCatalogdiv}>
        <button
          type="button"
          className={styles.addCatalogBtn}
          onClick={onAddProduct}
          id="cms-table-add-product-btn"
        >
          Tambah Bunga
        </button>
      </div>

      <div className={styles.tableCard}>
        {/* Top Filter and Controls Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.searchRow}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon} aria-hidden="true">
                🔍
              </span>
              <input
                id="cms-search-input"
                type="text"
                placeholder="Cari rangkaian, bunga, tag, atau ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Bersihkan pencarian"
                >
                  ✕
                </button>
              )}
            </div>

            <div className={styles.statusFilters}>
              <button
                type="button"
                className={`${styles.filterPill} ${selectedStatus === 'semua' ? styles.filterPillActive : ''
                  }`}
                onClick={() => setSelectedStatus('semua')}
              >
                Semua ({products.length})
              </button>
              <button
                type="button"
                className={`${styles.filterPill} ${selectedStatus === 'best-seller' ? styles.filterPillActive : ''
                  }`}
                onClick={() => setSelectedStatus('best-seller')}
              >
                ⭐ Best Seller ({products.filter((p) => p.isBestSeller).length})
              </button>
              <button
                type="button"
                className={`${styles.filterPill} ${selectedStatus === 'baru' ? styles.filterPillActive : ''
                  }`}
                onClick={() => setSelectedStatus('baru')}
              >
                🌿 Baru ({products.filter((p) => p.isNew).length})
              </button>
            </div>

            <div className={styles.sortBox}>
              <select
                id="cms-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as CmsSortOption)}
                className={styles.sortSelect}
                aria-label="Urutkan produk"
              >
                <option value="terbaru">Terbaru (Default)</option>
                <option value="rating-desc">Rating Tertinggi</option>
                <option value="harga-asc">Harga: Termurah</option>
                <option value="harga-desc">Harga: Termahal</option>
                <option value="nama-asc">Nama: A - Z</option>
              </select>
            </div>
          </div>


          {/* Category Pills */}
          <div className={styles.categoryScroll}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`${styles.categoryTab} ${selectedCategory === cat.key ? styles.categoryTabActive : ''
                  }`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon} aria-hidden="true">
              🔍
            </span>
            <h3 className={styles.emptyTitle}>Tidak Ada Produk Ditemukan</h3>
            <p className={styles.emptyText}>
              Tidak ada rangkaian bunga yang cocok dengan kriteria filter atau pencarian Anda.
            </p>
            <div className={styles.emptyActions}>
              <button
                type="button"
                className={styles.resetFiltersBtn}
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('semua')
                  setSelectedStatus('semua')
                }}
              >
                Reset Filter
              </button>
              <button type="button" className={styles.addNewBtn} onClick={onAddProduct}>
                + Tambah Bunga Baru
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.table} aria-label="Tabel Katalog Produk">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '30%' }}>
                    Produk &amp; Nama
                  </th>
                  <th scope="col" style={{ width: '13%' }}>
                    Kategori
                  </th>
                  <th scope="col" style={{ width: '16%' }}>
                    Harga
                  </th>
                  <th scope="col" style={{ width: '18%' }}>
                    Bunga &amp; Tag
                  </th>
                  <th scope="col" style={{ width: '11%' }}>
                    Status
                  </th>
                  <th scope="col" style={{ width: '12%', textAlign: 'right' }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const discount =
                    product.originalPrice && product.originalPrice > product.price
                      ? Math.round(
                        ((product.originalPrice - product.price) / product.originalPrice) * 100
                      )
                      : null

                  return (
                    <tr key={product.id} className={styles.tableRow}>
                      {/* Product & Thumb */}
                      <td>
                        <div className={styles.productCell}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className={styles.productThumb}
                            onError={(e) => {
                              ; (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=400&q=80'
                            }}
                          />
                          <div className={styles.productMeta}>
                            <span className={styles.productName}>{product.name}</span>
                            <span className={styles.productId}>ID: {product.id}</span>
                            <div className={styles.ratingInline}>
                              <span>⭐ {product.rating.toFixed(1)}</span>
                              <span className={styles.reviewsCount}>
                                ({product.reviewsCount} ulasan)
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td>
                        <span className={`${styles.categoryBadge} ${styles[product.category]}`}>
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td>
                        <div className={styles.priceCell}>
                          <span className={styles.priceMain}>{formatRupiah(product.price)}</span>
                          {product.originalPrice && (
                            <div className={styles.originalPriceRow}>
                              <span className={styles.priceStriked}>
                                {formatRupiah(product.originalPrice)}
                              </span>
                              {discount && <span className={styles.discountBadge}>-{discount}%</span>}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Flowers & Tags */}
                      <td>
                        <div className={styles.flowersCell}>
                          <div className={styles.chipRow}>
                            {product.flowersIncluded.slice(0, 2).map((f, i) => (
                              <span key={i} className={styles.flowerMiniChip}>
                                {f}
                              </span>
                            ))}
                            {product.flowersIncluded.length > 2 && (
                              <span className={styles.moreChip}>
                                +{product.flowersIncluded.length - 2}
                              </span>
                            )}
                          </div>
                          {product.tags && product.tags.length > 0 && (
                            <div className={styles.tagsMiniRow}>
                              {product.tags.slice(0, 2).map((t, i) => (
                                <span key={i} className={styles.tagMiniChip}>
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Status Toggles */}
                      <td>
                        <div className={styles.statusCell}>
                          <button
                            type="button"
                            className={`${styles.statusToggleBtn} ${product.isBestSeller ? styles.statusBestActive : ''
                              }`}
                            onClick={() => onToggleBestSeller(product)}
                            title="Klik untuk ubah status Best Seller"
                            aria-label={`Ubah status Best Seller untuk ${product.name}`}
                          >
                            ⭐ Best Seller
                          </button>
                          <button
                            type="button"
                            className={`${styles.statusToggleBtn} ${product.isNew ? styles.statusNewActive : ''
                              }`}
                            onClick={() => onToggleNew(product)}
                            title="Klik untuk ubah status Baru"
                            aria-label={`Ubah status Baru untuk ${product.name}`}
                          >
                            🌿 Baru
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className={styles.actionButtons}>
                          <button
                            type="button"
                            className={styles.actionBtn}
                            onClick={() => onPreviewProduct(product)}
                            title="Pratinjau Toko"
                            aria-label={`Pratinjau ${product.name}`}
                          >
                            👁️
                          </button>
                          <button
                            type="button"
                            className={`${styles.actionBtn} ${styles.editBtn}`}
                            onClick={() => onEditProduct(product)}
                            title="Edit Produk"
                            aria-label={`Edit ${product.name}`}
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                            onClick={() => onDeleteProduct(product)}
                            title="Hapus Produk"
                            aria-label={`Hapus ${product.name}`}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
