'use client'

import React, { type ReactNode } from 'react'
import { CartDrawer } from '@presentation/components/CartDrawer/CartDrawer'
import { Footer } from '@presentation/components/Footer/Footer'
import { Navbar } from '@presentation/components/Navbar/Navbar'
import { CartProvider } from '@shared/context/CartContext'

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <div style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      <Footer />
    </CartProvider>
  )
}
