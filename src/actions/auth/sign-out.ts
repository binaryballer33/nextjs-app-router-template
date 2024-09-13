"use server"

import type { AuthResponse } from "src/types/auth/auth-response"

import { revalidatePath } from "next/cache"

import { signOut as nextAuthSignOut } from "src/auth/auth"

export default async function signOut(): Promise<AuthResponse> {
    try {
        await nextAuthSignOut({ redirect: false })

        revalidatePath("/")

        return { status: 200, success: "You've Successfully Signed Out", user: null }
    } catch (error) {
        console.error("Error While Signing Out: ", error)
        return { error: "An Error Occurred While Signing Out", status: 500 }
    }
}
