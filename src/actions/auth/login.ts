"use server"

import { revalidatePath } from "next/cache"

import getUserByEmail from "src/actions/user/get-user-by-email"
import createVerificationToken from "src/actions/verification-token/createVerificationToken"
import { createAuthResponse } from "src/models/auth/auth-response"
import type { LoginRequest } from "src/models/forms/login"
import { LoginRequestSchema } from "src/models/forms/login"
import routes from "src/router/routes"
import { signIn } from "src/utils/auth/auth"
import sendVerificationEmail from "src/utils/emails/send-verification-email"

export default async function login(credentials: LoginRequest) {
    const { email, password } = LoginRequestSchema.parse(credentials)

    // check if user already exists and has an email and password before attempting to log in
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.encryptedPassword || !existingUser.email) {
        return createAuthResponse({
            status: 400,
            success: null,
            error: "Invalid Credentials, Maybe You Created Your Account With Google Or Facebook?",
            user: null,
        })
    }

    // if user email not verified, generate token for user and send verification email
    if (!existingUser.emailVerified) {
        const verificationToken = await createVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken!.email, verificationToken!.token)

        return createAuthResponse({
            status: 400,
            success: null,
            error: "Please Verify Your Email Before Attempting To Login.",
            user: null,
        })
    }

    try {
        await signIn("credentials", { email, password, redirect: false, redirectTo: routes.auth.login })
    } catch (error) {
        console.error("Next Auth Error Logging In With SignIn Credentials Provider:\n", error)
        return createAuthResponse({ status: 500, success: null, error: "Invalid Credentials", user: null })
    }

    revalidatePath("/")

    existingUser.encryptedPassword = null
    return createAuthResponse({ status: 200, success: "Successfully Logged In", error: null, user: existingUser })
}
