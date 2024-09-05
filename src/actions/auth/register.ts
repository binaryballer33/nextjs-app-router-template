"use server"

import { revalidatePath } from "next/cache"

import { hash } from "bcryptjs"

import getUserByEmail from "src/actions/user/get-user-by-email"
import createVerificationToken from "src/actions/verification-token/createVerificationToken"
import { createAuthResponse } from "src/models/auth/auth-response"
import type { RegisterRequest } from "src/models/forms/register"
import { RegisterRequestSchema } from "src/models/forms/register"
import prisma from "src/utils/database/prisma"
import sendVerificationEmail from "src/utils/emails/send-verification-email"

export default async function register(credentials: RegisterRequest) {
    const { firstName, lastName, email, password } = RegisterRequestSchema.parse(credentials)
    const hashedPassword = await hash(password, 10)
    const placeholderImage = "https://images.unsplash.com/photo-1569511502671-8c1bbf96fc8d?w=320&ah=320"

    const userAlreadyExists = await getUserByEmail(email)
    if (userAlreadyExists) {
        return createAuthResponse({
            status: 500,
            success: null,
            error: "User Already Exists",
            user: null,
        })
    }

    // TODO: add terms and conditions later
    try {
        const registeredUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                encryptedPassword: hashedPassword, // MAKE SURE HASHED PW IS STORED, NOT PLAINTEXT
                imageUrl: placeholderImage,
                image: placeholderImage,
            },
        })
        if (!registeredUser) {
            return createAuthResponse({
                status: 500,
                success: null,
                error: "Error Registering User",
                user: null,
            })
        }

        // generate a verification token for the newly registered user
        const verificationToken = await createVerificationToken(registeredUser.email)
        if (!verificationToken) {
            return createAuthResponse({
                status: 500,
                success: null,
                error: "Error Creating Verification Token",
                user: null,
            })
        }

        // send the verification email to the newly created user
        const verificationEmail = await sendVerificationEmail(verificationToken.email, verificationToken!.token)
        if (!verificationEmail) {
            return createAuthResponse({
                status: 500,
                success: null,
                error: "Error Sending Verification Email",
                user: null,
            })
        }

        // remove hashed password from response
        registeredUser.encryptedPassword = null
        revalidatePath("/")

        return createAuthResponse({
            status: 200,
            success: `Successfully Created Account For User: ${registeredUser.firstName} ${registeredUser.lastName}`,
            error: null,
            user: registeredUser,
        })
    } catch (error) {
        console.error(`Error Registering User: ${error}`)

        return createAuthResponse({
            status: 500,
            success: null,
            error: "Error Registering User And Sending Verification Email",
            user: null,
        })
    }
}
