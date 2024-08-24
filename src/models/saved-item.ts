export type SavedItem = {
    id: string
    userId: string
    yugiohCardId: number
    createdAt?: string
    updatedAt?: string
}

export type SavedItemWithoutId = Omit<SavedItem, "id">
