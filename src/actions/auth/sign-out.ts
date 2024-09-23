"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import { revalidatePath } from "next/cache"

import { signOut as nextAuthSignOut } from "src/auth/auth"

export default async function signOut(): Promise<ServerResponse> {
    try {
        await nextAuthSignOut({ redirect: false })

        revalidatePath("/")

        return { status: 200, success: "You've Successfully Signed Out" }
    } catch (error) {
        console.error("Error While Signing Out: ", error)
        return { error: "An Error Occurred While Signing Out", status: 500 }
    }
}
