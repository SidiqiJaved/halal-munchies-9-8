import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  userRole: string
  demoMode: 'customer' | 'franchise'
  login: (role: string) => void
  logout: () => void
  setDemoMode: (mode: 'customer' | 'franchise') => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('customer')
  const [demoMode, setDemoModeState] = useState<'customer' | 'franchise'>('customer')

  const login = (role: string) => {
    setIsLoggedIn(true)
    setUserRole(role)
    if (role === 'admin' || role === 'franchisee' || role === 'manager') {
      setDemoModeState('franchise')
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserRole('customer')
    setDemoModeState('customer')
  }

  const setDemoMode = (mode: 'customer' | 'franchise') => {
    setDemoModeState(mode)
    if (mode === 'franchise') {
      setIsLoggedIn(true)
      setUserRole('admin')
    } else {
      setIsLoggedIn(false)
      setUserRole('customer')
    }
  }

  // Determine effective auth state for demo mode
  const effectiveIsLoggedIn = isLoggedIn || demoMode === 'franchise'
  const effectiveUserRole = demoMode === 'franchise' ? 'admin' : userRole

  return (
    <AuthContext.Provider value={{
      isLoggedIn: effectiveIsLoggedIn,
      userRole: effectiveUserRole,
      demoMode,
      login,
      logout,
      setDemoMode
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}