import type { AdminUser } from './types'

export const AUTH_STORAGE_KEY = 'florist_admin_session_v1'

export const DEFAULT_ADMIN_USER: AdminUser = {
  id: 'adm-01',
  name: 'Admin Toko Florist',
  email: 'admin@florist.com',
  role: 'superadmin',
}

export const DEMO_CREDENTIALS = {
  email: 'admin@florist.com',
  password: 'AdminFlorist2026!',
}
