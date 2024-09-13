"use server"

import type { AuthResponse } from "src/types/auth/auth-response"
import type { LoginRequest } from "src/types/forms/login"

import { LoginRequestSchema } from "src/types/forms/login"

import { revalidatePath } from "next/cache"

import { signIn } from "src/auth/auth"

import sendVerificationEmail from "src/utils/emails/send-verification-email"

import getUserByEmail from "src/actions/user/get-user-by-email"
import createVerificationToken from "src/actions/verification-token/createVerificationToken"

export default async function login(credentials: LoginRequest): Promise<AuthResponse> {
    const { email, password } = LoginRequestSchema.parse(credentials)

    // check if user already exists and has an email and password before attempting to log in
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.encryptedPassword || !existingUser.email) {
        return { error: "Invalid Credentials, Maybe You Created Your Account With Google Or Facebook?", status: 400 }
    }

    // if user email not verified, generate token for user and send verification email
    if (!existingUser.emailVerified) {
        const verificationToken = await createVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken!.email, verificationToken!.token)

        return { error: "Please Verify Your Email Before Attempting To Login.", status: 400 }
    }

    try {
        await signIn("credentials", { email, password, redirect: false })
    } catch (error) {
        console.error("Next Auth Error Logging In With SignIn Credentials Provider:\n", error)
        return { error: "Invalid Credentials", status: 500 }
    }

    revalidatePath("/")

    existingUser.encryptedPassword = null
    return { status: 200, success: "Successfully Logged In", user: existingUser }
}
