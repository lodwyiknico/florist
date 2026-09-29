import { describe, expect, it } from 'vitest'
import {
  emailSchema,
  flowerProductSchema,
  phoneSchema,
  sanitizeHTML,
  stripHTML,
} from './validators'

describe('Security Validators', () => {
  describe('sanitizeHTML', () => {
    it('should strip malicious script tags', () => {
      const dirty = '<p>Bunga Cantik <script>alert("xss")</script></p>'
      const clean = sanitizeHTML(dirty)
      expect(clean).not.toContain('<script>')
      expect(clean).toContain('<p>Bunga Cantik </p>')
    })
  })

  describe('stripHTML', () => {
    it('should strip all HTML tags', () => {
      const dirty = '<b>Mawar Merah</b>'
      expect(stripHTML(dirty)).toBe('Mawar Merah')
    })
  })

  describe('emailSchema', () => {
    it('should validate and normalize correct email', () => {
      const res = emailSchema.safeParse('  TEST@Example.com ')
      expect(res.success).toBe(true)
      if (res.success) {
        expect(res.data).toBe('test@example.com')
      }
    })

    it('should fail on invalid email', () => {
      const res = emailSchema.safeParse('invalid-email')
      expect(res.success).toBe(false)
    })
  })

  describe('phoneSchema', () => {
    it('should validate and strip non-digit characters in Indonesian phone number', () => {
      const res = phoneSchema.safeParse('+62 812-3456-7890')
      expect(res.success).toBe(true)
      if (res.success) {
        expect(res.data).toBe('6281234567890')
      }
    })
  })

  describe('flowerProductSchema', () => {
    it('should validate valid flower product input', () => {
      const validProduct = {
        name: 'Buket Mawar Pink Romantis',
        category: 'buket',
        price: 350000,
        originalPrice: 400000,
        rating: 4.8,
        reviewsCount: 15,
        image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364',
        tags: ['Romantis', 'Mawar'],
        flowersIncluded: ['Mawar Pink', 'Baby Breath'],
        description: 'Buket mawar pink segar pilihan untuk momen romantis terbaik.',
        isBestSeller: true,
        isNew: false,
      }

      const res = flowerProductSchema.safeParse(validProduct)
      expect(res.success).toBe(true)
    })

    it('should fail if required fields are missing or invalid', () => {
      const invalidProduct = {
        name: 'AB', // too short (< 3)
        category: 'invalid-cat',
        price: -100, // negative price
        image: 'not-a-valid-url',
        flowersIncluded: [], // min 1
        description: 'Short', // too short (< 10)
      }

      const res = flowerProductSchema.safeParse(invalidProduct)
      expect(res.success).toBe(false)
      if (!res.success) {
        const issues = res.error.issues.map((i) => i.path[0])
        expect(issues).toContain('name')
        expect(issues).toContain('category')
        expect(issues).toContain('price')
        expect(issues).toContain('image')
        expect(issues).toContain('flowersIncluded')
        expect(issues).toContain('description')
      }
    })
  })
})

