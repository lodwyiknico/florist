// ============================================================
// Centralized Application Error Hierarchy
// Semua error di app ini extend dari AppError
// ============================================================

/**
 * Base error class. Jangan throw langsung — gunakan subclass.
 */
export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode: number = 500,
    /** true = error yang diharapkan (validasi, not found), false = bug */
    public readonly isOperational: boolean = true,
    public readonly details?: Record<string, unknown>
  ) {
    super(message)
    this.name = this.constructor.name
    Object.setPrototypeOf(this, new.target.prototype)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public readonly fields?: Record<string, string[]>
  ) {
    super('VALIDATION_ERROR', message, 400, true, { fields })
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super('UNAUTHORIZED', message, 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super('FORBIDDEN', message, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404)
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message, 409)
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super('RATE_LIMIT', 'Too many requests. Please try again later.', 429)
  }
}

export class NetworkError extends AppError {
  constructor() {
    super('NETWORK_ERROR', 'Network connection failed. Please check your internet.', 0)
  }
}

export class ServerError extends AppError {
  constructor(message = 'An unexpected error occurred') {
    super('SERVER_ERROR', message, 500, false)
  }
}

// ============================================================
// Helper: user-facing messages (tidak expose detail teknis)
// ============================================================
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ValidationError) return error.message
  if (error instanceof AuthenticationError)
    return 'Sesi Anda telah berakhir. Silakan login kembali.'
  if (error instanceof AuthorizationError) return 'Anda tidak memiliki akses ke halaman ini.'
  if (error instanceof NotFoundError) return 'Data yang Anda cari tidak ditemukan.'
  if (error instanceof NetworkError) return 'Koneksi internet bermasalah. Periksa koneksi Anda.'
  if (error instanceof RateLimitError) return 'Terlalu banyak percobaan. Silakan tunggu sebentar.'
  return 'Terjadi kesalahan. Silakan coba lagi.'
}
