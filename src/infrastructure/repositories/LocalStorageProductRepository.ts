import type { FlowerProduct } from '@domain/models/FlowerProduct'
import type {
  CreateProductInput,
  IProductRepository,
  UpdateProductInput,
} from '@domain/repositories/IProductRepository'
import { FLOWER_PRODUCTS } from '@infrastructure/data/products'

export const CATALOG_STORAGE_KEY = 'florist_catalog_products_v1'
export const CATALOG_EVENT_KEY = 'florist_catalog_updated'

export class LocalStorageProductRepository implements IProductRepository {
  private getStorage(): Storage | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage
    }
    return null
  }

  private notifyChange(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(CATALOG_EVENT_KEY))
    }
  }

  private readFromStorage(): FlowerProduct[] {
    const storage = this.getStorage()
    if (!storage) {
      return [...FLOWER_PRODUCTS]
    }

    try {
      const data = storage.getItem(CATALOG_STORAGE_KEY)
      if (!data) {
        // Seed initial mock data
        storage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(FLOWER_PRODUCTS))
        return [...FLOWER_PRODUCTS]
      }
      const parsed = JSON.parse(data)
      return Array.isArray(parsed) ? parsed : [...FLOWER_PRODUCTS]
    } catch {
      return [...FLOWER_PRODUCTS]
    }
  }

  private writeToStorage(products: FlowerProduct[]): void {
    const storage = this.getStorage()
    if (storage) {
      storage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(products))
      this.notifyChange()
    }
  }

  async getAll(): Promise<FlowerProduct[]> {
    return this.readFromStorage()
  }

  async getById(id: string): Promise<FlowerProduct | null> {
    const products = this.readFromStorage()
    const found = products.find((p) => p.id === id)
    return found ? { ...found } : null
  }

  async create(input: CreateProductInput): Promise<FlowerProduct> {
    const products = this.readFromStorage()
    const id = input.id || `fl-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`

    const newProduct: FlowerProduct = {
      ...input,
      id,
      rating: input.rating ?? 5.0,
      reviewsCount: input.reviewsCount ?? 0,
      tags: input.tags ?? [],
      flowersIncluded: input.flowersIncluded ?? [],
      isBestSeller: Boolean(input.isBestSeller),
      isNew: input.isNew !== undefined ? Boolean(input.isNew) : true,
    }

    const updated = [newProduct, ...products]
    this.writeToStorage(updated)
    return newProduct
  }

  async update(id: string, input: UpdateProductInput): Promise<FlowerProduct> {
    const products = this.readFromStorage()
    const index = products.findIndex((p) => p.id === id)

    if (index === -1) {
      throw new Error(`Produk dengan ID ${id} tidak ditemukan.`)
    }

    const existing = products[index]
    const updatedProduct: FlowerProduct = {
      ...existing,
      ...input,
      id: existing.id, // ID must remain immutable
    }

    const updatedList = [...products]
    updatedList[index] = updatedProduct

    this.writeToStorage(updatedList)
    return updatedProduct
  }

  async delete(id: string): Promise<void> {
    const products = this.readFromStorage()
    const updated = products.filter((p) => p.id !== id)
    this.writeToStorage(updated)
  }

  async reset(): Promise<FlowerProduct[]> {
    const storage = this.getStorage()
    if (storage) {
      storage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(FLOWER_PRODUCTS))
      this.notifyChange()
    }
    return [...FLOWER_PRODUCTS]
  }
}

export const productRepository = new LocalStorageProductRepository()
