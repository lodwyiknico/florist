'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { FlowerProduct } from '@domain/models/FlowerProduct'
import { AdminGuard, useAuth } from '@features/auth'
import { useCatalog } from '@features/catalog/context/CatalogContext'
import {
  CmsAnalytics,
  CmsSidebar,
  CmsTable,
  CmsToast,
  DeleteConfirmModal,
  ProductFormModal,
  ProductPreviewModal,
  type CmsTab,
  type ProductModalState,
  type ToastMessage,
} from '@features/cms'
import type { FlowerProductFormData } from '@security/validators'
import styles from './katalog.module.css'

export default function AdminKatalogPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const {
    products,
    stats,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useCatalog()


  // Sidebar & Navigation State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<CmsTab>('katalog')

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, type, text }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }

  // Modals state
  const [formModal, setFormModal] = useState<ProductModalState>({
    isOpen: false,
    mode: 'create',
    product: undefined,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    product: FlowerProduct | null
    isDeleting: boolean
  }>({
    isOpen: false,
    product: null,
    isDeleting: false,
  })

  const [previewProduct, setPreviewProduct] = useState<FlowerProduct | null>(null)

  // Handlers

  const handleOpenCreate = () => {
    setFormModal({
      isOpen: true,
      mode: 'create',
      product: undefined,
    })
  }

  const handleOpenEdit = (product: FlowerProduct) => {
    setFormModal({
      isOpen: true,
      mode: 'edit',
      product,
    })
  }

  const handleFormSubmit = async (data: FlowerProductFormData) => {
    try {
      setIsSubmitting(true)
      if (formModal.mode === 'create') {
        await addProduct(data)
        showToast('success', `Rangkaian "${data.name}" berhasil ditambahkan ke katalog!`)
      } else if (formModal.product) {
        await updateProduct(formModal.product.id, data)
        showToast('success', `Perubahan pada "${data.name}" berhasil disimpan!`)
      }
      setFormModal({ isOpen: false, mode: 'create', product: undefined })
    } catch (err) {
      console.error(err)
      showToast('error', 'Terjadi kesalahan saat menyimpan produk.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenDelete = (product: FlowerProduct) => {
    setDeleteModal({
      isOpen: true,
      product,
      isDeleting: false,
    })
  }

  const handleConfirmDelete = async () => {
    if (!deleteModal.product) return
    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }))
      await deleteProduct(deleteModal.product.id)
      showToast('success', `Produk "${deleteModal.product.name}" berhasil dihapus.`)
      setDeleteModal({ isOpen: false, product: null, isDeleting: false })
    } catch (err) {
      console.error(err)
      showToast('error', 'Gagal menghapus produk.')
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }))
    }
  }

  const handleToggleBestSeller = async (product: FlowerProduct) => {

    try {
      const nextVal = !product.isBestSeller
      await updateProduct(product.id, { isBestSeller: nextVal })
      showToast(
        'info',
        nextVal
          ? `"${product.name}" sekarang ditandai sebagai Best Seller.`
          : `Status Best Seller dicopot dari "${product.name}".`
      )
    } catch (err) {
      console.error(err)
      showToast('error', 'Gagal mengubah status produk.')
    }
  }

  const handleToggleNew = async (product: FlowerProduct) => {
    try {
      const nextVal = !product.isNew
      await updateProduct(product.id, { isNew: nextVal })
      showToast(
        'info',
        nextVal
          ? `"${product.name}" sekarang diberi tanda Produk Baru.`
          : `Tanda Produk Baru dicopot dari "${product.name}".`
      )
    } catch (err) {
      console.error(err)
      showToast('error', 'Gagal mengubah status produk.')
    }
  }

  const handleLogout = () => {
    logout()
    router.replace('/admin/login')
  }

  return (
    <AdminGuard>
      <div className={styles.adminLayout}>
        {/* Toast Alerts */}
        <CmsToast
          toasts={toasts}
          onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
        />

        {/* Collapsible Left Sidebar */}
        <CmsSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          user={user}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main
          className={`${styles.mainContent} ${isSidebarOpen ? styles.contentWithOpenSidebar : styles.contentWithCollapsedSidebar
            }`}
        >
          {/* Top Bar Navigation */}
          <div className={styles.topBar}>
            <div className={styles.topBarLeft}>
              <button
                type="button"
                className={styles.menuMobileBtn}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Buka/Tutup Menu Sidebar"
              >
                ☰
              </button>
              <div>
                <div className={styles.breadcrumb}>
                  <span>CMS Admin</span>
                  <span>/</span>
                  <span className={styles.breadcrumbActive}>
                    {activeTab === 'katalog' ? 'Daftar Katalog' : 'Ringkasan & Metrik'}
                  </span>
                </div>
                <h1 className={styles.pageHeading}>
                  {activeTab === 'katalog' ? 'Kelola Katalog Bunga' : 'Ringkasan & Metrik Toko'}
                </h1>
              </div>
            </div>

            <div className={styles.topBarActions}>
              <Link href="/koleksi" className={styles.viewStoreBtn}>
                <span aria-hidden="true">👁️</span> Lihat Toko
              </Link>
            </div>
          </div>



          {/* Separated Content based on Active Tab */}
          <div className={styles.contentBody}>
            {activeTab === 'katalog' ? (
              <section aria-label="Manajemen Tabel Bunga">
                <CmsTable
                  products={products}
                  onAddProduct={handleOpenCreate}
                  onEditProduct={handleOpenEdit}
                  onDeleteProduct={handleOpenDelete}
                  onPreviewProduct={(product) => setPreviewProduct(product)}
                  onToggleBestSeller={handleToggleBestSeller}
                  onToggleNew={handleToggleNew}
                />
              </section>
            ) : (
              <section aria-label="Ringkasan Statistik Katalog">
                <CmsAnalytics
                  products={products}
                  stats={stats}
                  onGoToCatalog={() => setActiveTab('katalog')}
                />
              </section>

            )}
          </div>
        </main>

        {/* Modals */}
        <ProductFormModal
          isOpen={formModal.isOpen}
          mode={formModal.mode}
          initialProduct={formModal.product}
          isSubmitting={isSubmitting}
          onClose={() => setFormModal({ isOpen: false, mode: 'create', product: undefined })}
          onSubmit={handleFormSubmit}
        />

        <DeleteConfirmModal
          isOpen={deleteModal.isOpen}
          product={deleteModal.product}
          isDeleting={deleteModal.isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteModal({ isOpen: false, product: null, isDeleting: false })}
        />

        <ProductPreviewModal
          isOpen={Boolean(previewProduct)}
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      </div>
    </AdminGuard>
  )
}

