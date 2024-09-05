"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { signOut as nextAuthSignOut } from "src/utils/auth/auth"

export default async function signOut() {
    await nextAuthSignOut()

    revalidatePath("/")
    redirect("/sign-out")
}
