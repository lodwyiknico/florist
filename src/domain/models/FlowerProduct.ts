export type FlowerCategory = 'semua' | 'buket' | 'meja' | 'standing' | 'wisuda' | 'anniversary'

export interface FlowerProduct {
  id: string
  name: string
  category: Exclude<FlowerCategory, 'semua'>
  price: number
  originalPrice?: number
  rating: number
  reviewsCount: number
  image: string
  tags: string[]
  isBestSeller?: boolean
  isNew?: boolean
  description: string
  flowersIncluded: string[]
}
