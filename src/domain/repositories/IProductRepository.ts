import type { FlowerProduct } from '@domain/models/FlowerProduct'

export type CreateProductInput = Omit<FlowerProduct, 'id' | 'rating' | 'reviewsCount'> & {
  id?: string
  rating?: number
  reviewsCount?: number
}
export type UpdateProductInput = Partial<Omit<FlowerProduct, 'id'>>


export interface IProductRepository {
  getAll(): Promise<FlowerProduct[]>
  getById(id: string): Promise<FlowerProduct | null>
  create(input: CreateProductInput): Promise<FlowerProduct>
  update(id: string, input: UpdateProductInput): Promise<FlowerProduct>
  delete(id: string): Promise<void>
  reset(): Promise<FlowerProduct[]>
}
