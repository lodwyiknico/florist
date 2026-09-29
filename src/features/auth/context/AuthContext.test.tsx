import React from 'react'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { AUTH_STORAGE_KEY, DEMO_CREDENTIALS } from '../constants'
import { AuthProvider, useAuth } from './AuthContext'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('AuthContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should initialize with unauthenticated state when storage is empty', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('should fail login with invalid credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    let loginResult: { success: boolean; error?: string } = { success: false }
    await act(async () => {
      loginResult = await result.current.login({
        email: 'wrong@example.com',
        password: 'WrongPassword',
      })
    })

    expect(loginResult.success).toBe(false)
    expect(loginResult.error).toContain('Email/username atau password salah')
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('should succeed login with correct demo credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    let loginResult: { success: boolean; error?: string } = { success: false }
    await act(async () => {
      loginResult = await result.current.login({
        email: DEMO_CREDENTIALS.email,
        password: DEMO_CREDENTIALS.password,
      })
    })

    expect(loginResult.success).toBe(true)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user?.email).toBe(DEMO_CREDENTIALS.email)

    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
    expect(raw).not.toBeNull()
    const parsed = JSON.parse(raw!)
    expect(parsed.user.email).toBe(DEMO_CREDENTIALS.email)
    expect(parsed.expiresAt).toBeGreaterThan(Date.now())
  })

  it('should allow login with username "admin"', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    let loginResult: { success: boolean; error?: string } = { success: false }
    await act(async () => {
      loginResult = await result.current.login({
        email: 'admin',
        password: DEMO_CREDENTIALS.password,
      })
    })

    expect(loginResult.success).toBe(true)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('should clear session on logout', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login({
        email: DEMO_CREDENTIALS.email,
        password: DEMO_CREDENTIALS.password,
      })
    })

    expect(result.current.isAuthenticated).toBe(true)

    act(() => {
      result.current.logout()
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
  })
})
