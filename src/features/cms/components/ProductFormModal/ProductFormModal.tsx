import React, { useState } from 'react'

import type { FlowerCategory, FlowerProduct } from '@domain/models/FlowerProduct'
import { PRESET_FLOWER_IMAGES } from '@features/cms/constants/presetImages'
import {
  flowerProductSchema,
  stripHTML,
  type FlowerProductFormData,
} from '@security/validators'
import styles from './ProductFormModal.module.css'

interface ProductFormModalProps {
  isOpen: boolean
  mode: 'create' | 'edit'
  initialProduct?: FlowerProduct
  isSubmitting: boolean
  onClose: () => void
  onSubmit: (data: FlowerProductFormData) => Promise<void>
}

const ProductFormDialog: React.FC<Omit<ProductFormModalProps, 'isOpen'>> = ({
  mode,
  initialProduct,
  isSubmitting,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FlowerProductFormData>(() => {
    if (mode === 'edit' && initialProduct) {
      return {
        name: initialProduct.name,
        category: initialProduct.category,
        price: initialProduct.price,
        originalPrice: initialProduct.originalPrice ?? undefined,
        rating: initialProduct.rating,
        reviewsCount: initialProduct.reviewsCount,
        image: initialProduct.image,
        tags: [...initialProduct.tags],
        flowersIncluded: [...initialProduct.flowersIncluded],
        description: initialProduct.description,
        isBestSeller: Boolean(initialProduct.isBestSeller),
        isNew: Boolean(initialProduct.isNew),
      }
    }
    return {
      name: '',
      category: 'buket',
      price: 350000,
      originalPrice: undefined,
      rating: 5.0,
      reviewsCount: 0,
      image:
        'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
      tags: ['Rangkaian Segar'],
      flowersIncluded: ['Mawar Merah', 'Baby Breath'],
      description:
        'Rangkaian bunga segar pilihan dengan kualitas bunga impor terbaik untuk setiap momen spesial.',
      isBestSeller: false,
      isNew: true,
    }
  })

  const [tagInput, setTagInput] = useState('')
  const [flowerInput, setFlowerInput] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPresets, setShowPresets] = useState(false)


  const handleAddTag = () => {
    const cleaned = stripHTML(tagInput).trim()
    if (!cleaned) return
    if (!formData.tags.includes(cleaned)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, cleaned] }))
    }
    setTagInput('')
  }

  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))
  }

  const handleAddFlower = () => {
    const cleaned = stripHTML(flowerInput).trim()
    if (!cleaned) return
    if (!formData.flowersIncluded.includes(cleaned)) {
      setFormData((prev) => ({
        ...prev,
        flowersIncluded: [...prev.flowersIncluded, cleaned],
      }))
    }
    setFlowerInput('')
  }

  const handleRemoveFlower = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      flowersIncluded: prev.flowersIncluded.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const payload = {
      ...formData,
      name: stripHTML(formData.name).trim(),
      description: stripHTML(formData.description).trim(),
      price: Number(formData.price),
      originalPrice:
        formData.originalPrice !== undefined &&
        formData.originalPrice !== null &&
        String(formData.originalPrice) !== ''
          ? Number(formData.originalPrice)
          : undefined,
      rating: Number(formData.rating),
      reviewsCount: Number(formData.reviewsCount),
    }

    const validation = flowerProductSchema.safeParse(payload)

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    await onSubmit(validation.data)
  }

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val || 0)

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div>
            <span className={styles.badgeLabel}>
              {mode === 'create' ? '✨ Produk Baru' : '✏️ Perbarui Data'}
            </span>
            <h2 id="product-form-title" className={styles.title}>
              {mode === 'create' ? 'Tambah Rangkaian Bunga' : `Edit: ${formData.name || 'Produk'}`}
            </h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Tutup formulir"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div className={styles.formGrid}>
            {/* Left Column: Details */}
            <div className={styles.leftCol}>
              {/* Product Name */}
              <div className={styles.fieldGroup}>
                <label htmlFor="product-name" className={styles.label}>
                  Nama Rangkaian Bunga <span className={styles.req}>*</span>
                </label>
                <input
                  id="product-name"
                  type="text"
                  placeholder="Contoh: Eternal Rose Blossom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              {/* Category */}
              <div className={styles.fieldGroup}>
                <label htmlFor="product-category" className={styles.label}>
                  Kategori Bunga <span className={styles.req}>*</span>
                </label>
                <select
                  id="product-category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as Exclude<FlowerCategory, 'semua'>,
                    })
                  }

                  className={styles.select}
                >
                  <option value="buket">Buket Bunga</option>
                  <option value="meja">Bunga Meja & Vas</option>
                  <option value="standing">Standing Flower</option>
                  <option value="wisuda">Buket Wisuda</option>
                  <option value="anniversary">Anniversary & Box</option>
                </select>
                {errors.category && <span className={styles.errorText}>{errors.category}</span>}
              </div>

              {/* Prices Row */}
              <div className={styles.twoCols}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="product-price" className={styles.label}>
                    Harga Jual (Rp) <span className={styles.req}>*</span>
                  </label>
                  <input
                    id="product-price"
                    type="number"
                    min={1000}
                    step={5000}
                    placeholder="350000"
                    value={formData.price || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) || 0 })
                    }
                    className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
                  />
                  <span className={styles.currencyPreview}>
                    Preview: {formatRupiah(formData.price)}
                  </span>
                  {errors.price && <span className={styles.errorText}>{errors.price}</span>}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="product-original-price" className={styles.label}>
                    Harga Coret (Diskon)
                  </label>
                  <input
                    id="product-original-price"
                    type="number"
                    min={1000}
                    step={5000}
                    placeholder="Opsional (misal: 400000)"
                    value={formData.originalPrice ?? ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className={styles.input}
                  />
                  {formData.originalPrice ? (
                    <span className={styles.currencyPreview}>
                      Diskon:{' '}
                      {Math.max(
                        0,
                        Math.round(
                          ((formData.originalPrice - formData.price) / formData.originalPrice) * 100
                        )
                      )}
                      % ({formatRupiah(formData.originalPrice)})
                    </span>
                  ) : (
                    <span className={styles.hintText}>Kosongkan jika tidak ada diskon</span>
                  )}
                  {errors.originalPrice && (
                    <span className={styles.errorText}>{errors.originalPrice}</span>
                  )}
                </div>
              </div>

              {/* Flowers Included */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Jenis Bunga yang Disertakan <span className={styles.req}>*</span>
                </label>
                <div className={styles.inlineAddRow}>
                  <input
                    id="product-flower-input"
                    type="text"
                    placeholder="Ketik nama bunga (misal: Mawar Pink) lalu tekan Enter"
                    value={flowerInput}
                    onChange={(e) => setFlowerInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddFlower()
                      }
                    }}
                    className={styles.input}
                  />
                  <button
                    type="button"
                    onClick={handleAddFlower}
                    className={styles.miniAddBtn}
                  >
                    + Tambah
                  </button>
                </div>
                <div className={styles.chipsContainer}>
                  {formData.flowersIncluded.map((flower, idx) => (
                    <span key={idx} className={styles.flowerChip}>
                      🌸 {flower}
                      <button
                        type="button"
                        onClick={() => handleRemoveFlower(idx)}
                        className={styles.chipRemoveBtn}
                        aria-label={`Hapus ${flower}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                {errors.flowersIncluded && (
                  <span className={styles.errorText}>{errors.flowersIncluded}</span>
                )}
              </div>

              {/* Tags */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Tag & Label Pencarian</label>
                <div className={styles.inlineAddRow}>
                  <input
                    id="product-tag-input"
                    type="text"
                    placeholder="Ketik tag (misal: Mewah, Impor, Valentine) lalu tekan Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                    className={styles.input}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className={styles.miniAddBtn}
                  >
                    + Tambah
                  </button>
                </div>
                <div className={styles.chipsContainer}>
                  {formData.tags.map((tag, idx) => (
                    <span key={idx} className={styles.tagChip}>
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className={styles.chipRemoveBtn}
                        aria-label={`Hapus tag ${tag}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className={styles.fieldGroup}>
                <div className={styles.labelWithCounter}>
                  <label htmlFor="product-desc" className={styles.label}>
                    Deskripsi Rangkaian <span className={styles.req}>*</span>
                  </label>
                  <span className={styles.counter}>{formData.description.length}/1000</span>
                </div>
                <textarea
                  id="product-desc"
                  rows={4}
                  placeholder="Jelaskan keunikan rangkaian, jenis wrapping, vas, maupun aroma bunga..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                />
                {errors.description && (
                  <span className={styles.errorText}>{errors.description}</span>
                )}
              </div>
            </div>

            {/* Right Column: Image Preview & Settings */}
            <div className={styles.rightCol}>
              {/* Image Input & Preview */}
              <div className={styles.fieldGroup}>
                <div className={styles.labelWithAction}>
                  <label htmlFor="product-image" className={styles.label}>
                    URL Foto Bunga <span className={styles.req}>*</span>
                  </label>
                  <button
                    type="button"
                    className={styles.presetToggleBtn}
                    onClick={() => setShowPresets(!showPresets)}
                  >
                    {showPresets ? 'Tutup Pilihan Foto' : '🖼️ Pilih Foto Siap Pakai'}
                  </button>
                </div>

                <input
                  id="product-image"
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className={`${styles.input} ${errors.image ? styles.inputError : ''}`}
                />
                {errors.image && <span className={styles.errorText}>{errors.image}</span>}

                {/* Preset Picker Dropdown */}
                {showPresets && (
                  <div className={styles.presetsBox}>
                    <span className={styles.presetTitle}>Pilih Foto Berkualitas Tinggi:</span>
                    <div className={styles.presetList}>
                      {PRESET_FLOWER_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={styles.presetItem}
                          onClick={() => {
                            setFormData({ ...formData, image: preset.url })
                            setShowPresets(false)
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className={styles.presetThumb}
                          />
                          <span className={styles.presetLabel}>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Live Image Box */}
                <div className={styles.imagePreviewBox}>
                  {formData.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={formData.image}
                      alt="Pratinjau"
                      className={styles.liveImage}
                      onError={(e) => {
                        ;(e.target as HTMLElement).style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className={styles.emptyImageBox}>
                      <span>🌸</span>
                      <p>Pratinjau foto akan muncul di sini</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Flags */}
              <div className={styles.flagsCard}>
                <span className={styles.flagsTitle}>Status & Sorotan Produk</span>

                <label className={styles.switchRow}>
                  <input
                    id="product-is-bestseller"
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className={styles.checkbox}
                  />
                  <div className={styles.switchText}>
                    <strong>⭐ Tandai sebagai Best Seller</strong>
                    <span>Produk akan tampil di deretan produk unggulan & diberi pita khusus.</span>
                  </div>
                </label>

                <label className={styles.switchRow}>
                  <input
                    id="product-is-new"
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className={styles.checkbox}
                  />
                  <div className={styles.switchText}>
                    <strong>🌿 Tandai sebagai Rangkaian Baru</strong>
                    <span>Menampilkan badge 'Baru' untuk menarik perhatian pembeli.</span>
                  </div>
                </label>
              </div>

              {/* Rating & Reviews */}
              <div className={styles.twoCols}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="product-rating" className={styles.label}>
                    Rating Default (1.0 - 5.0)
                  </label>
                  <input
                    id="product-rating"
                    type="number"
                    min={1}
                    max={5}
                    step={0.1}
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: Number(e.target.value) || 5.0 })
                    }
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="product-reviews" className={styles.label}>
                    Jumlah Ulasan Awal
                  </label>
                  <input
                    id="product-reviews"
                    type="number"
                    min={0}
                    step={1}
                    value={formData.reviewsCount}
                    onChange={(e) =>
                      setFormData({ ...formData, reviewsCount: Number(e.target.value) || 0 })
                    }
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              id="cms-save-product-btn"
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Menyimpan...'
                : mode === 'create'
                  ? 'Simpan & Publikasikan Bunga'
                  : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, ...props }) => {
  if (!isOpen) return null

  return (
    <ProductFormDialog
      key={props.mode === 'edit' ? (props.initialProduct?.id ?? 'edit') : 'create'}
      {...props}
    />
  )
}

