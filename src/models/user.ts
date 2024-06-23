import { CartItem } from './cart-item'

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
  cart: CartItem[]
}

export type UpdateUser = {
  id: string // not updating id, just using it to build the route in the user api
  email?: string | null
  firstName?: string | null
  lastName?: string | null
}
