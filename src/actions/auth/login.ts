"use server"

import type { ServerResponse } from "src/types/auth/server-response"
import type { LoginRequest } from "src/types/forms/login"

import { LoginRequestSchema } from "src/types/forms/login"

import { signIn } from "src/auth/auth"

import sendVerificationEmail from "src/actions/emails/send-verification-email"
import getUserByEmail from "src/actions/user/get-user-by-email"
import createVerificationToken from "src/actions/verification-token/create-verification-token"

export default async function login(credentials: LoginRequest): Promise<ServerResponse> {
    try {
        // validate the users credentials from the form using zod, throw error if data sent from front end is invalid
        const { email, password } = LoginRequestSchema.parse(credentials)

        // check if user already exists and has an email and password before attempting to log in
        const userResponse = await getUserByEmail(email)
        if (!("user" in userResponse)) return userResponse

        // if user doesn't exists or doesn't have an email or password, return error
        if (!userResponse.user || !userResponse.user.encryptedPassword || !userResponse.user.email) {
            return {
                error: "Invalid Credentials, Maybe You Created Your Account With Google Or Facebook?",
                status: 400,
            }
        }

        // if user email not verified, generate token for user and send verification email
        if (!userResponse.user.emailVerified) {
            // create verification token and make sure it was created
            const responseVerificationToken = await createVerificationToken(userResponse.user.email)
            if (!("token" in responseVerificationToken)) return responseVerificationToken

            // if token was created successfully, send verification email
            return await sendVerificationEmail(responseVerificationToken.token)
        }

        // if user exists and email of the user is already verified, log the user in
        await signIn("credentials", { email, password, redirect: false })

        userResponse.user.encryptedPassword = null
        return { status: 200, success: "Login Successful", user: userResponse.user }
    } catch (error) {
        console.error("Next Auth Error Logging In With SignIn Credentials Provider:\n", error)
        return { error: "Invalid Credentials", status: 500 }
    }
}
