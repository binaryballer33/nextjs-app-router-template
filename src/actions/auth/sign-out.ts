"use server"

import { revalidatePath } from "next/cache"

import { signOut as nextAuthSignOut } from "src/utils/auth/auth"

export default async function signOut() {
    await nextAuthSignOut()
    revalidatePath("/")
}
