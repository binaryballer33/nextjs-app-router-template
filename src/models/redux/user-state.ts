import { User } from '../user'

export type UserState = {
  token: string
  user: User | null
}
