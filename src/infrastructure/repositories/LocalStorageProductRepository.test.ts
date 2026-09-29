import { beforeEach, describe, expect, it } from 'vitest'
import { FLOWER_PRODUCTS } from '@infrastructure/data/products'
import {
  CATALOG_STORAGE_KEY,
  LocalStorageProductRepository,
} from './LocalStorageProductRepository'

describe('LocalStorageProductRepository', () => {
  let repository: LocalStorageProductRepository

  beforeEach(() => {
    window.localStorage.clear()
    repository = new LocalStorageProductRepository()
  })

  it('should seed default products when storage is empty', async () => {
    const products = await repository.getAll()
    expect(products.length).toBe(FLOWER_PRODUCTS.length)
    expect(products[0].name).toBe(FLOWER_PRODUCTS[0].name)
    expect(window.localStorage.getItem(CATALOG_STORAGE_KEY)).not.toBeNull()
  })

  it('should find product by id', async () => {
    const product = await repository.getById('fl-01')
    expect(product).not.toBeNull()
    expect(product?.name).toBe('Eternal Rose Blossom')
  })

  it('should return null for non-existent product id', async () => {
    const product = await repository.getById('non-existent-id')
    expect(product).toBeNull()
  })

  it('should create a new product', async () => {
    const newProduct = await repository.create({
      name: 'Bunga Anggrek Lavender',
      category: 'meja',
      price: 250000,
      image: 'https://example.com/flower.jpg',
      tags: ['Lavender', 'Meja'],
      flowersIncluded: ['Anggrek'],
      description: 'Rangkaian anggrek lavender cantik untuk meja kerja.',
    })

    expect(newProduct.id).toBeDefined()
    expect(newProduct.name).toBe('Bunga Anggrek Lavender')

    const all = await repository.getAll()
    expect(all.length).toBe(FLOWER_PRODUCTS.length + 1)
    expect(all[0].id).toBe(newProduct.id)
  })

  it('should update an existing product', async () => {
    const updated = await repository.update('fl-01', {
      price: 399000,
      name: 'Eternal Rose Blossom Special Edition',
    })

    expect(updated.price).toBe(399000)
    expect(updated.name).toBe('Eternal Rose Blossom Special Edition')

    const fetched = await repository.getById('fl-01')
    expect(fetched?.price).toBe(399000)
  })

  it('should delete a product', async () => {
    await repository.delete('fl-01')
    const fetched = await repository.getById('fl-01')
    expect(fetched).toBeNull()

    const all = await repository.getAll()
    expect(all.length).toBe(FLOWER_PRODUCTS.length - 1)
  })

  it('should reset back to initial mock products', async () => {
    await repository.delete('fl-01')
    await repository.delete('fl-02')

    let all = await repository.getAll()
    expect(all.length).toBe(FLOWER_PRODUCTS.length - 2)

    const resetResult = await repository.reset()
    expect(resetResult.length).toBe(FLOWER_PRODUCTS.length)

    all = await repository.getAll()
    expect(all.length).toBe(FLOWER_PRODUCTS.length)
  })
})
