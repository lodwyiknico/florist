'use client'

import React, { Component, type ReactNode } from 'react'
import { AppError, getErrorMessage } from '@domain/errors/AppError'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, info: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * React Error Boundary — menangkap error dari subtree komponen.
 * Gunakan di route-level atau di sekitar komponen yang berisiko error.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // TODO: Kirim ke monitoring service (Sentry, Datadog, dll)
    console.error('[ErrorBoundary]', error, info)
    this.props.onError?.(error, info)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />
    }
    return this.props.children
  }
}

// ============================================================
// Default fallback UI
// ============================================================
interface ErrorFallbackProps {
  error: Error | null
  onReset: () => void
}

const ErrorFallback = ({ error, onReset }: ErrorFallbackProps) => {
  const isOperational = error instanceof AppError && error.isOperational
  const message = error ? getErrorMessage(error) : 'Terjadi kesalahan.'

  return (
    <div role="alert" aria-live="assertive" className={styles.container}>
      <div className={styles.icon}>{isOperational ? '⚠️' : '🔥'}</div>
      <h2 className={styles.title}>
        {isOperational ? 'Oops, ada masalah!' : 'Terjadi kesalahan sistem'}
      </h2>
      <p className={styles.message}>{message}</p>
      <button
        id="error-boundary-retry-btn"
        type="button"
        className={styles.button}
        onClick={onReset}
      >
        Coba Lagi
      </button>
    </div>
  )
}
