export type CartItem = {
    id: string
    userId: string
    yugiohCardId: number
    name: string
    desc: string
    price: number
    quantity: number
    createdAt?: string
    updatedAt?: string
}

export type CartItemWithoutId = Omit<CartItem, "id">
