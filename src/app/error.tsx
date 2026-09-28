'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log ke monitoring service jika ada
    console.error('[App Error Boundary Caught]:', error)
  }, [error])

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: '2rem',
        textAlign: 'center',
        gap: '1rem',
      }}
    >
      <span style={{ fontSize: '3rem' }}>⚠️</span>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Terjadi Kesalahan Sistem</h2>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '40ch' }}>
        {error.message || 'Mohon maaf, halaman tidak dapat dimuat.'}
      </p>
      <button
        id="app-error-retry-button"
        type="button"
        onClick={() => reset()}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.75rem',
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: '#ffffff',
          background: 'var(--color-primary)',
          borderRadius: '9999px',
          cursor: 'pointer',
        }}
      >
        Coba Lagi
      </button>
    </div>
  )
}
