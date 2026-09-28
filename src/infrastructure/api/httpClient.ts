import {
  AppError,
  AuthenticationError,
  AuthorizationError,
  ConflictError,
  NetworkError,
  NotFoundError,
  RateLimitError,
  ServerError,
  ValidationError,
} from '@domain/errors/AppError'

// ============================================================
// Tipe untuk response error dari API
// ============================================================
interface ApiErrorResponse {
  code: string
  message: string
  errors?: Record<string, string[]>
}

// ============================================================
// HTTP Client berbasis fetch — production-ready
// ============================================================

type RequestConfig = {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  signal?: AbortSignal
}

class HttpClient {
  constructor(private readonly baseURL: string) {}

  async get<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', path, undefined, config)
  }

  async post<T>(path: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', path, body, config)
  }

  async put<T>(path: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', path, body, config)
  }

  async patch<T>(path: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PATCH', path, body, config)
  }

  async delete<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', path, undefined, config)
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const url = new URL(path, this.baseURL)

    if (config?.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        url.searchParams.set(key, String(value))
      })
    }

    let response: Response
    try {
      response = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: config?.signal,
        credentials: 'include', // untuk HttpOnly cookies
      })
    } catch {
      throw new NetworkError()
    }

    if (!response.ok) {
      await this.handleError(response)
    }

    // 204 No Content — tidak ada body
    if (response.status === 204) return undefined as T

    return response.json() as Promise<T>
  }

  private async handleError(response: Response): Promise<never> {
    let errorData: ApiErrorResponse
    try {
      errorData = (await response.json()) as ApiErrorResponse
    } catch {
      errorData = { code: 'UNKNOWN', message: response.statusText }
    }

    switch (response.status) {
      case 400:
        throw new ValidationError(errorData.message, errorData.errors)
      case 401:
        throw new AuthenticationError(errorData.message)
      case 403:
        throw new AuthorizationError(errorData.message)
      case 404:
        throw new NotFoundError(errorData.message)
      case 409:
        throw new ConflictError(errorData.message)
      case 429:
        throw new RateLimitError()
      default:
        throw new ServerError(errorData.message)
    }
  }
}

export const httpClient = new HttpClient(
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1'
)

// Re-export AppError agar tidak perlu import dari 2 tempat
export type { AppError }
