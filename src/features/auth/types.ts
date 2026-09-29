export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'superadmin' | 'catalog_manager'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: AdminUser | null
  isLoading: boolean
}
