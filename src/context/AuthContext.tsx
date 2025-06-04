// contexts/AuthContext.tsx
'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isLogin: boolean
  setIsLogin: (value: boolean) => void
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider Component
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLogin, setIsLogin] = useState<boolean>(false)

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom Hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}