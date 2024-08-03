import { CartItem } from "./cart-item"

export type User = {
    id: string
    email: string
    firstname: string
    lastname: string
    createdAt: string
    updatedAt: string
    cart: CartItem[]
}

export type UpdateUser = {
    id: string // not updating id, just using it to build the route in the user api
    email?: string | null
    firstname?: string | null
    lastname?: string | null
}
