import type { User } from 'src/models/user'

export interface AuthContextValue {
  user: User | null
  error: string | null
  isLoading: boolean
  checkSession: () => Promise<void>
}
