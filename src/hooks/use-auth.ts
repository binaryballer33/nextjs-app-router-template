import React from 'react'
import { UserContext } from 'src/contexts/auth/supabase/auth-context'
import { AuthContextValue } from 'src/contexts/auth/types'

export function useAuth(): AuthContextValue {
  const context = React.useContext(UserContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
