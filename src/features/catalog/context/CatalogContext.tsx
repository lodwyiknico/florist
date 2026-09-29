'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { FlowerProduct } from '@domain/models/FlowerProduct'
import type {
  CreateProductInput,
  UpdateProductInput,
} from '@domain/repositories/IProductRepository'
import { FLOWER_PRODUCTS } from '@infrastructure/data/products'
import {
  CATALOG_EVENT_KEY,
  productRepository,
} from '@infrastructure/repositories/LocalStorageProductRepository'

export interface CatalogStats {
  total: number
  bestSellers: number
  newArrivals: number
  categoriesCount: number
  averagePrice: number
}

interface CatalogContextType {
  products: FlowerProduct[]
  isLoading: boolean
  stats: CatalogStats
  addProduct: (input: CreateProductInput) => Promise<FlowerProduct>
  updateProduct: (id: string, input: UpdateProductInput) => Promise<FlowerProduct>
  deleteProduct: (id: string) => Promise<void>
  resetToDefaults: () => Promise<void>
  getProductById: (id: string) => FlowerProduct | undefined
  refresh: () => Promise<void>
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined)

export const CatalogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<FlowerProduct[]>(FLOWER_PRODUCTS)
  const [isLoading, setIsLoading] = useState(true)

  const loadProducts = useCallback(async () => {
    try {
      const data = await productRepository.getAll()
      setProducts(data)
    } catch (err) {
      console.error('Failed to load flower catalog:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    productRepository
      .getAll()
      .then((data) => {
        if (active) {
          setProducts(data)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error('Failed to load flower catalog:', err)
        if (active) setIsLoading(false)
      })

    const handleCatalogUpdate = () => {
      productRepository.getAll().then((data) => {
        if (active) setProducts(data)
      })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener(CATALOG_EVENT_KEY, handleCatalogUpdate)
      window.addEventListener('storage', handleCatalogUpdate)
    }

    return () => {
      active = false
      if (typeof window !== 'undefined') {
        window.removeEventListener(CATALOG_EVENT_KEY, handleCatalogUpdate)
        window.removeEventListener('storage', handleCatalogUpdate)
      }
    }
  }, [])


  const addProduct = useCallback(async (input: CreateProductInput): Promise<FlowerProduct> => {
    const created = await productRepository.create(input)
    setProducts((prev) => [created, ...prev.filter((p) => p.id !== created.id)])
    return created
  }, [])

  const updateProduct = useCallback(
    async (id: string, input: UpdateProductInput): Promise<FlowerProduct> => {
      const updated = await productRepository.update(id, input)
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)))
      return updated
    },
    []
  )

  const deleteProduct = useCallback(async (id: string): Promise<void> => {
    await productRepository.delete(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const resetToDefaults = useCallback(async (): Promise<void> => {
    const defaults = await productRepository.reset()
    setProducts(defaults)
  }, [])

  const getProductById = useCallback(
    (id: string): FlowerProduct | undefined => {
      return products.find((p) => p.id === id)
    },
    [products]
  )

  const stats = useMemo<CatalogStats>(() => {
    const total = products.length
    const bestSellers = products.filter((p) => p.isBestSeller).length
    const newArrivals = products.filter((p) => p.isNew).length
    const uniqueCategories = new Set(products.map((p) => p.category)).size
    const averagePrice =
      total > 0 ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / total) : 0

    return {
      total,
      bestSellers,
      newArrivals,
      categoriesCount: uniqueCategories,
      averagePrice,
    }
  }, [products])

  const contextValue = useMemo<CatalogContextType>(
    () => ({
      products,
      isLoading,
      stats,
      addProduct,
      updateProduct,
      deleteProduct,
      resetToDefaults,
      getProductById,
      refresh: loadProducts,
    }),
    [
      products,
      isLoading,
      stats,
      addProduct,
      updateProduct,
      deleteProduct,
      resetToDefaults,
      getProductById,
      loadProducts,
    ]
  )

  return <CatalogContext.Provider value={contextValue}>{children}</CatalogContext.Provider>
}

export const useCatalog = (): CatalogContextType => {
  const context = useContext(CatalogContext)
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider')
  }
  return context
}
