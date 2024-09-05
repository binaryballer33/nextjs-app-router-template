import type { NextAuthConfig } from "next-auth"

import prisma from "src/utils/database/prisma"

/*
 * the user object that is returned from the authorize callback is passed to the sign-in callback
 * the sign-in callback is called right after the authorize callback
 * jwt callback is called after the sign-in callback and happens after the user has been logged in and returns the token
 * session callback happens after the jwt callback and uses the token returned from the jwt callback, returns the session
 */
const callbacks: NextAuthConfig["callbacks"] = {
    // authorized: async ({ request, auth }) => {
    //     return true
    // },

    // async redirect({ url, baseUrl }) {
    //     return baseUrl
    // },

    async jwt({ token, user }) {
        if (user) token.role = user.role
        console.log("JWT Callback", { token, user })
        return token
    },

    async session({ session, token }) {
        if (token?.sub && token?.role) {
            session.user.id = token.sub
            session.user.role = token.role
        }
        console.log("Session Callback", { session, token })
        return session
    },

    async signIn({ user, account }) {
        if (account?.provider === "google") {
            try {
                // should have the users email if they are doing oauth with Google
                if (!user || !user.email) return false

                const { email, name, image } = user

                const alreadyUser = await prisma.user.findUnique({ where: { email } })

                // if the user does not exist when trying to sign in with Google oauth, create the user
                if (!alreadyUser) {
                    await prisma.user.create({
                        data: {
                            email,
                            imageUrl: image,
                            firstName: name?.split(" ")[0]!,
                            lastName: name?.split(" ")[1]!,
                        },
                    })
                } else {
                    return true
                }
            } catch (error) {
                throw new Error("Error While Creating User")
            }
        }
        console.log("Sign In Callback", { user, account })
        return account?.provider === "credentials"
    },
}

export default callbacks
