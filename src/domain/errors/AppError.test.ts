import { describe, expect, it } from 'vitest'
import {
  AppError,
  AuthenticationError,
  getErrorMessage,
  NotFoundError,
  ValidationError,
} from './AppError'

describe('AppError hierarchy', () => {
  it('should instantiate ValidationError with code and statusCode 400', () => {
    const error = new ValidationError('Input tidak valid', {
      email: ['Format email salah'],
    })
    expect(error).toBeInstanceOf(AppError)
    expect(error.code).toBe('VALIDATION_ERROR')
    expect(error.statusCode).toBe(400)
    expect(error.isOperational).toBe(true)
    expect(error.details?.fields).toEqual({ email: ['Format email salah'] })
  })

  it('should format user friendly error messages with getErrorMessage', () => {
    const notFound = new NotFoundError('Produk')
    expect(getErrorMessage(notFound)).toBe('Data yang Anda cari tidak ditemukan.')

    const authError = new AuthenticationError()
    expect(getErrorMessage(authError)).toBe('Sesi Anda telah berakhir. Silakan login kembali.')

    const unknownError = new Error('Database connection crashed')
    expect(getErrorMessage(unknownError)).toBe('Terjadi kesalahan. Silakan coba lagi.')
  })
})
