import { describe, expect, it } from 'vitest'
import { emailSchema, phoneSchema, sanitizeHTML, stripHTML } from './validators'

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
})
