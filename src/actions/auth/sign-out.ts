"use server"

import type { ServerResponse } from "src/types/auth/server-response"

import { signOut as nextAuthSignOut } from "src/auth/auth"

export default async function signOut(): Promise<ServerResponse> {
    try {
        await nextAuthSignOut({ redirect: false })
        return { status: 200, success: "Sign Out Successful" }
    } catch (error) {
        console.error(`Error While Signing Out: ${error}`)
        return { error: "An Error Occurred While Signing Out", status: 500 }
    }
}
