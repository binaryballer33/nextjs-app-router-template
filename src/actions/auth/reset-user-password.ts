"use server"

import type { ServerResponse } from "src/types/auth/server-response"

export default async function resetUserPassword(email: string): Promise<ServerResponse> {
    try {
        console.log(email)
        // implement server action to reset the user's password
        const mockedResponse: ServerResponse = {
            status: 200 as 200,
            success: "Password Reset Successfully, You May Log In With The New Password",
        }
        if (!mockedResponse) return { error: `Error Resetting User ${"Shaquille Mandy"}'s Password:`, status: 500 }
        return mockedResponse
    } catch (error) {
        console.error(`Error Resetting User ${"Shaquille Mandy"}'s Password: ${error}`)
        return { error: `Error Resetting User ${"Shaquille Mandy"}'s Password: ${error}`, status: 500 }
    }
}
