import type { DefaultSession } from "@auth/core/types"

import "next-auth"
import "next-auth/jwt"

interface ExtendedUser extends DefaultSession.user {
    email: string
    emailVerified: Date
    firstName: string
    imageUrl?: string
    lastName: string
    role: "ADMIN" | "USER"
}

declare module "@auth/core/types" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User extends ExtendedUser {}
}

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: ExtendedUser
    }

    /**
     *  JWT callback is able to use this user object
     */
    interface User extends ExtendedUser {}
}

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: ExtendedUser
    }

    /**
     *  JWT callback is able to use this user object
     */
    interface User extends ExtendedUser {}
}

/**
 * The JWT callback token object now has a `role` and whatever other properties you need
 */
declare module "next-auth/jwt" {
    interface JWT {
        firstName?: string
        lastName?: string
        role?: "ADMIN" | "USER"
    }
}

declare module "@auth/core/types" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: ExtendedUser
    }
}
