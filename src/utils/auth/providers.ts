import { compare } from "bcryptjs"
import type { Provider } from "next-auth/providers"
import Credentials from "next-auth/providers/credentials"
import Facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"

import { LoginRequestSchema } from "src/models/forms/login"
import prisma from "src/utils/database/prisma"

/*
 * Array of objects that define the authentication providers
 * that you want to use. e.g. google, facebook, credentials, etc.
 */
const providers: Provider[] = [
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    Facebook({
        clientId: process.env.AUTH_FACEBOOK_ID,
        clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),

    Credentials({
        name: "Credentials",

        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },

        /*
         * The authorize callback is invoked when the user clicks the sign-in button
         * and the credentials are submitted. It is the first callback to be called, next is sign-in callback
         */
        authorize: async (credentials) => {
            console.log("Authorize Callback", { credentials })
            const validatedCredentials = LoginRequestSchema.safeParse(credentials)

            if (!validatedCredentials.success) {
                console.error("Invalid Credentials:", validatedCredentials.error.errors)
                return null
            }

            const { email, password } = validatedCredentials.data

            // check if the user exists
            // TODO: move this code to its appropriate place later
            const existingUser = await prisma.user.findUnique({
                where: {
                    email,
                },
            })

            console.log(`Does User Exist: ${existingUser}`)
            if (!existingUser) throw new Error("Invalid Email Or Password")
            if (!existingUser.encryptedPassword) throw new Error("Invalid Email Or Password")

            const passwordMatches = await compare(password, existingUser.encryptedPassword)

            // don't tell hackers if the email or password is wrong
            if (!passwordMatches) throw new Error("Invalid Email Or Password")

            // return user object
            return {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                role: existingUser.role,
                id: existingUser.id,
                image: existingUser.imageUrl,
                name: `${existingUser.firstName} ${existingUser.lastName}`,
            }
        },
    }),
]

export default providers
