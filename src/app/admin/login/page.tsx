'use client'

import React, { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { DEMO_CREDENTIALS, useAuth } from '@features/auth'
import { FloristLogo } from '@shared/components/FloristLogo/FloristLogo'
import styles from './login.module.css'

function AdminLoginContent() {
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTarget = searchParams.get('redirect') || '/admin/katalog'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // If already authenticated, redirect immediately
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTarget)
    }
  }, [isAuthenticated, redirectTarget, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Silakan isi email/username dan password.')
      return
    }

    setIsSubmitting(true)
    const result = await login({ email, password })
    setIsSubmitting(false)

    if (result.success) {
      router.replace(redirectTarget)
    } else {
      setErrorMessage(result.error || 'Autentikasi gagal.')
    }
  }

  const handleFillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
    setErrorMessage('')
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.cardContainer}>
        {/* Brand header */}
        <div className={styles.brandHeader}>
          <Link href="/" className={styles.brandLogo} title="Kembali ke Beranda">
            <FloristLogo size={42} />
            <span className={styles.brandText}>Florist</span>
          </Link>
          <div className={styles.securityBadge}>
            <span aria-hidden="true">🔒</span> Portal CMS Admin
          </div>
          <h1 className={styles.title}>Masuk ke Panel Katalog</h1>
          <p className={styles.subtitle}>
            Akses sistem manajemen untuk mengatur rangkaian bunga, harga, dan koleksi toko.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className={styles.errorAlert} role="alert">
            <span className={styles.errorIcon} aria-hidden="true">
              ⚠️
            </span>
            <span className={styles.errorText}>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="admin-email" className={styles.label}>
              Email atau Username
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon} aria-hidden="true">
                👤
              </span>
              <input
                id="admin-email"
                type="text"
                autoComplete="username"
                placeholder="admin@florist.com atau admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.passwordLabelRow}>
              <label htmlFor="admin-password" className={styles.label}>
                Kata Sandi
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon} aria-hidden="true">
                🔑
              </span>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Masukkan kata sandi admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                disabled={isSubmitting}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            id="admin-login-submit"
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.btnLoading}>
                <span className={styles.btnSpinner} aria-hidden="true" />
                Memverifikasi...
              </span>
            ) : (
              'Masuk ke CMS Katalog →'
            )}
          </button>
        </form>

        {/* Demo Credentials Helper Box */}
        <div className={styles.demoCard}>
          <div className={styles.demoHeader}>
            <span className={styles.demoBadge}>Kredensial Demo</span>
            <button
              type="button"
              className={styles.fillDemoBtn}
              onClick={handleFillDemo}
              id="fill-demo-credentials-btn"
            >
              ⚡ Isi Otomatis
            </button>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Email:</span>
            <code className={styles.demoCode}>{DEMO_CREDENTIALS.email}</code>
          </div>
          <div className={styles.demoRow}>
            <span className={styles.demoLabel}>Password:</span>
            <code className={styles.demoCode}>{DEMO_CREDENTIALS.password}</code>
          </div>
        </div>

        {/* Security & Back Navigation */}
        <div className={styles.footerNote}>
          <p className={styles.securityText}>
            🛡️ Dilindungi enkripsi sesi dan proteksi rate limiting percobaan masuk.
          </p>
          <Link href="/" className={styles.backLink}>
            ← Kembali ke Toko Florist
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
      <AdminLoginContent />
    </Suspense>
  )
}
