import { CredentialsSignin } from "@auth/core/errors"
import Credentials from "@auth/core/providers/credentials"
import { compare } from "bcryptjs"
import type { Provider } from "next-auth/providers"
import Facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"

import getUserByEmail from "src/actions/user/get-user-by-email"
import { LoginRequestSchema } from "src/models/forms/login"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "src/utils/secrets"

/*
 * Array of objects that define the authentication providers
 * that you want to use. e.g. google, facebook, credentials, etc.
 */
const providers: Provider[] = [
    Google({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,

        /*
         * allows one email account to be linked to multiple accounts
         * so you can sign in with credentials, but then also sign in with Google or Facebook
         */
        allowDangerousEmailAccountLinking: false, // keep it false, it's not recommended to do this
    }),

    // TODO: figure out how to do oauth with Facebook
    Facebook,

    Credentials({
        name: "Credentials",

        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },

        /*
         * The authorize callback is invoked when the user clicks the sign-in button
         * and the credentials are submitted. It is the first callback to be called, next is the sign-in callback
         */
        authorize: async (credentials) => {
            const validatedCredentials = LoginRequestSchema.safeParse(credentials)

            if (!validatedCredentials.success) {
                console.error("Request Body Malformed, Invalid Credentials:", validatedCredentials.error.errors)
                return null
            }

            const { email, password } = validatedCredentials.data

            // check if the user exists
            const existingUser = await getUserByEmail(email)
            if (!existingUser || !existingUser.encryptedPassword) {
                throw new CredentialsSignin("User Doesn't Exist, Or Account Is OAuth")
            }

            // don't tell hackers if the email or password is wrong
            const passwordMatches = await compare(password, existingUser.encryptedPassword)
            if (!passwordMatches) throw new CredentialsSignin("User Password Doesn't Match")

            // return user object
            return {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                role: existingUser.role,
                id: existingUser.id,
                image: existingUser.imageUrl,
                imageUrl: existingUser.imageUrl!,
                name: `${existingUser.firstName} ${existingUser.lastName}`,
                emailVerified: existingUser.emailVerified!,
            }
        },
    }),
]

export default providers
