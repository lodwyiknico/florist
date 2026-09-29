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

// ============================================================
// Flower Product Schema (CMS & Catalog)
// ============================================================

export const flowerCategorySchema = z.enum([
  'buket',
  'meja',
  'standing',
  'wisuda',
  'anniversary',
])

export const flowerProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Nama rangkaian minimal 3 karakter')
    .max(100, 'Nama rangkaian maksimal 100 karakter'),
  category: flowerCategorySchema,
  price: z
    .number()
    .min(1000, 'Harga minimal Rp 1.000')
    .max(100000000, 'Harga melebihi batas maksimal'),
  originalPrice: z
    .number()
    .min(1000, 'Harga coret minimal Rp 1.000')
    .optional()
    .nullable(),

  rating: z
    .number()
    .min(1, 'Rating minimal 1.0')
    .max(5, 'Rating maksimal 5.0')
    .default(5.0),
  reviewsCount: z.number().int().min(0, 'Jumlah ulasan tidak boleh negatif').default(0),
  image: z
    .string()
    .trim()
    .min(1, 'URL gambar wajib diisi')
    .refine(
      (val) =>
        val.startsWith('http://') ||
        val.startsWith('https://') ||
        val.startsWith('/') ||
        val.startsWith('data:image/'),
      { message: 'URL gambar harus berupa link valid (http, https, atau path gambar)' }
    ),
  tags: z.array(z.string().trim().min(1)).default([]),
  flowersIncluded: z
    .array(z.string().trim().min(1))
    .min(1, 'Minimal cantumkan 1 jenis bunga yang disertakan'),
  description: z
    .string()
    .trim()
    .min(10, 'Deskripsi minimal 10 karakter')
    .max(1000, 'Deskripsi maksimal 1000 karakter'),
  isBestSeller: z.boolean().optional().default(false),
  isNew: z.boolean().optional().default(false),
})

export type FlowerProductFormData = z.infer<typeof flowerProductSchema>

