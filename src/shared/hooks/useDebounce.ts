import { useEffect, useRef, useState } from 'react'

/**
 * Delay eksekusi value hingga user berhenti mengetik.
 * Berguna untuk search/autocomplete agar tidak spam API.
 *
 * @example
 * const debouncedQuery = useDebounce(searchQuery, 400)
 * useEffect(() => { fetchResults(debouncedQuery) }, [debouncedQuery])
 */
export const useDebounce = <T>(value: T, delayMs: number = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debouncedValue
}

/**
 * Menjalankan callback hanya saat dependency berubah (bukan mount pertama).
 */
export const useUpdateEffect = (effect: React.EffectCallback, deps: React.DependencyList) => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
