import DOMPurify, { type Config } from 'dompurify'
import { z } from 'zod'

// ============================================================
// Input Sanitization
// ============================================================

/**
 * Sanitasi HTML string dari XSS.
 * HANYA gunakan ini ketika WAJIB render HTML (misal dari rich text editor).
 * Untuk teks biasa, gunakan textContent — BUKAN innerHTML.
 */
export const sanitizeHTML = (html: string, options?: Config): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li', 'ol'],
    ALLOWED_ATTR: ['href', 'rel', 'target'],
    ...options,
  }) as string
}

/**
 * Strip semua HTML dari string — return plain text.
 */
export const stripHTML = (html: string): string => {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }) as string
}

// ============================================================
// Zod Schemas — reusable validators
// ============================================================

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Email wajib diisi')
  .email('Format email tidak valid')
  .max(254, 'Email terlalu panjang')

export const passwordSchema = z
  .string()
  .min(8, 'Password minimal 8 karakter')
  .max(128, 'Password terlalu panjang')
  .regex(/[A-Z]/, 'Harus ada minimal 1 huruf kapital')
  .regex(/[0-9]/, 'Harus ada minimal 1 angka')
  .regex(/[^A-Za-z0-9]/, 'Harus ada minimal 1 karakter spesial')

export const searchQuerySchema = z
  .string()
  .max(200, 'Pencarian terlalu panjang')
  .trim()
  .transform((val) => val.replace(/[<>'"]/g, ''))

export const uuidSchema = z.string().uuid('ID tidak valid')

export const phoneSchema = z
  .string()
  .transform((val) => val.replace(/\D/g, ''))
  .pipe(z.string().regex(/^(62|0)[0-9]{8,13}$/, 'Nomor telepon tidak valid'))
