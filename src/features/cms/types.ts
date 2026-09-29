import type { FlowerCategory, FlowerProduct } from '@domain/models/FlowerProduct'

export type CmsTab = 'katalog' | 'stats'

export type CmsSortOption = 'terbaru' | 'harga-asc' | 'harga-desc' | 'nama-asc' | 'rating-desc'


export type CmsFilterStatus = 'semua' | 'best-seller' | 'baru'

export interface CmsFilters {
  searchQuery: string
  category: FlowerCategory
  status: CmsFilterStatus
  sortBy: CmsSortOption
}

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  text: string
}

export interface ProductModalState {
  isOpen: boolean
  mode: 'create' | 'edit'
  product?: FlowerProduct
}
