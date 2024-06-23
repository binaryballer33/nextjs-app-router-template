import { ThemeState } from './theme-state'
import { UserState } from './user-state'

export type RootState = {
  theme: ThemeState
  user: UserState
}
