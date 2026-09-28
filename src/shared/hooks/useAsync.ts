import { useCallback, useState } from 'react'
import { AppError, ServerError } from '@domain/errors/AppError'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: AppError | null
}

/**
 * Hook generic untuk mengelola state async operation.
 * Otomatis normalize semua error ke AppError.
 *
 * @example
 * const { data, loading, error, execute: login } = useAsync(authService.login)
 * await login({ email, password })
 */
export const useAsync = <TArgs extends unknown[], TResult>(
  asyncFn: (...args: TArgs) => Promise<TResult>
) => {
  const [state, setState] = useState<AsyncState<TResult>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (...args: TArgs): Promise<TResult> => {
      setState({ data: null, loading: true, error: null })
      try {
        const data = await asyncFn(...args)
        setState({ data, loading: false, error: null })
        return data
      } catch (err) {
        const error =
          err instanceof AppError ? err : new ServerError('An unexpected error occurred')
        setState({ data: null, loading: false, error })
        throw error
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [asyncFn]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return { ...state, execute, reset }
}
