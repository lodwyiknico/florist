'use client'

import React, { type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { AuthProvider } from '@features/auth'
import { CatalogProvider } from '@features/catalog/context/CatalogContext'
import { CartDrawer } from '@presentation/components/CartDrawer/CartDrawer'
import { Footer } from '@presentation/components/Footer/Footer'
import { Navbar } from '@presentation/components/Navbar/Navbar'
import { CartProvider } from '@shared/context/CartContext'

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin') ?? false

  return (
    <AuthProvider>
      <CatalogProvider>
        <CartProvider>
          {!isAdminRoute && <Navbar />}
          {!isAdminRoute && <CartDrawer />}
          <div
            style={{
              minHeight: isAdminRoute ? '100vh' : 'calc(100vh - 73px)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </div>
          {!isAdminRoute && <Footer />}
        </CartProvider>
      </CatalogProvider>
    </AuthProvider>
  )
}



