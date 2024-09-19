"use server"

import type { AuthResponse } from "src/types/auth/auth-response"
import type { RegisterRequest } from "src/types/forms/register"

import { RegisterRequestSchema } from "src/types/forms/register"

import { revalidatePath } from "next/cache"

import { hash } from "bcryptjs"

import prisma from "src/utils/database/prisma"

import sendVerificationEmail from "src/actions/emails/send-verification-email"
import getUserByEmail from "src/actions/user/get-user-by-email"
import createVerificationToken from "src/actions/verification-token/createVerificationToken"

export default async function register(credentials: RegisterRequest): Promise<AuthResponse> {
    const { email, firstName, lastName, password } = RegisterRequestSchema.parse(credentials)
    const hashedPassword = await hash(password, 10)
    const placeholderImage = "https://images.unsplash.com/photo-1569511502671-8c1bbf96fc8d?w=320&ah=320"

    const userAlreadyExists = await getUserByEmail(email)
    if (userAlreadyExists) return { error: "User Already Exists", status: 500 }

    // TODO: add terms and conditions later
    try {
        const registeredUser = await prisma.user.create({
            data: {
                email,
                encryptedPassword: hashedPassword, // MAKE SURE HASHED PW IS STORED, NOT PLAINTEXT
                firstName,
                image: placeholderImage,
                imageUrl: placeholderImage,
                lastName,
            },
        })
        if (!registeredUser) return { error: "Error Registering User", status: 500 }

        // generate a verification token for the newly registered user
        const verificationToken = await createVerificationToken(registeredUser.email)
        if (!verificationToken) return { error: "Error Creating Verification Token", status: 500 }

        // send the verification email to the newly created user
        const verificationEmail = await sendVerificationEmail(verificationToken)
        if (!verificationEmail) return { error: "Error Sending Verification Email", status: 500 }

        // remove hashed password from response
        registeredUser.encryptedPassword = null
        revalidatePath("/")

        return {
            status: 200,
            success: `Successfully Created Account For User: ${registeredUser.firstName} ${registeredUser.lastName}`,
            user: registeredUser,
        }
    } catch (error) {
        console.error(`Error Registering User: ${error}`)
        return { error: "Error Registering User And Sending Verification Email", status: 500 }
    }
}
