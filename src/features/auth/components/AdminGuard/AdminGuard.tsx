'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import styles from './AdminGuard.module.css'

interface AdminGuardProps {
  children: React.ReactNode
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      const redirectUrl = `/admin/login?redirect=${encodeURIComponent(pathname)}`
      router.replace(redirectUrl)
    }
  }, [mounted, isAuthenticated, isLoading, router, pathname])

  // On server and initial client hydration, render loading placeholder to prevent mismatch
  if (!mounted || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.loadingText}>Memverifikasi sesi admin...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
