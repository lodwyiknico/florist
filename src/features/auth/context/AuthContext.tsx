'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  AUTH_STORAGE_KEY,
  DEFAULT_ADMIN_USER,
  DEMO_CREDENTIALS,
} from '../constants'
import type { AdminUser, LoginCredentials } from '../types'

interface SessionData {
  user: AdminUser
  expiresAt: number
}

interface AuthContextType {
  isAuthenticated: boolean
  user: AdminUser | null
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const SESSION_DURATION_HOURS = 24

const getStoredSession = (): AdminUser | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const session: SessionData = JSON.parse(raw)
    if (session.expiresAt && Date.now() < session.expiresAt) {
      return session.user
    }
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  } catch {
    return null
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [failedAttempts, setFailedAttempts] = useState(0)

  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null)

  const clearSession = useCallback(() => {
    setUser(null)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    const session = getStoredSession()
    if (session) {
      setUser(session)
    }
    setIsLoading(false)

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_STORAGE_KEY) {
        setUser(getStoredSession())
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])



  const login = useCallback(
    async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
      // Brute-force lockout check
      if (lockoutUntil && Date.now() < lockoutUntil) {
        const remainingSeconds = Math.ceil((lockoutUntil - Date.now()) / 1000)
        return {
          success: false,
          error: `Terlalu banyak percobaan gagal. Silakan tunggu ${remainingSeconds} detik lagi.`,
        }
      }

      // Simulate a small network delay for security & realistic UX
      await new Promise((resolve) => setTimeout(resolve, 400))

      const normalizedInput = credentials.email.trim().toLowerCase()
      const isEmailMatch =
        normalizedInput === DEMO_CREDENTIALS.email.toLowerCase() ||
        normalizedInput === 'admin'
      const isPasswordMatch = credentials.password === DEMO_CREDENTIALS.password

      if (!isEmailMatch || !isPasswordMatch) {
        const nextAttempts = failedAttempts + 1
        setFailedAttempts(nextAttempts)
        if (nextAttempts >= 5) {
          const lockTime = Date.now() + 30 * 1000 // 30 seconds lockout
          setLockoutUntil(lockTime)
          return {
            success: false,
            error: 'Akun dikunci sementara karena 5x kesalahan login. Tunggu 30 detik.',
          }
        }
        return {
          success: false,
          error: 'Email/username atau password salah. Cek kredensial demo.',
        }
      }

      // Successful login
      setFailedAttempts(0)
      setLockoutUntil(null)
      const authenticatedUser = { ...DEFAULT_ADMIN_USER }
      const expiresAt = Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000

      const sessionData: SessionData = {
        user: authenticatedUser,
        expiresAt,
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData))
      }

      setUser(authenticatedUser)
      return { success: true }
    },
    [failedAttempts, lockoutUntil]
  )

  const logout = useCallback(() => {
    clearSession()
  }, [clearSession])

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: Boolean(user),
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
