import type { DefaultSession } from "@auth/core/types"

import "next-auth"
import "next-auth/jwt"

export interface Env {
    NODE_ENV?: "development" | "production"

    // APIS
    NEXT_PUBLIC_RAPID_API_KEY?: string
    RESEND_API_KEY?: string

    // Backend Web Server
    NEXT_PUBLIC_BACKEND_BASE_URL?: string

    // Database
    DATABASE_URL?: string

    // Supabase
    NEXT_PUBLIC_SUPABASE_REF_ID?: string
    NEXT_PUBLIC_SUPABASE_URL?: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string

    // AWS
    NEXT_PUBLIC_AWS_ACCESS_KEY_ID?: string
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY?: string
    NEXT_PUBLIC_AWS_REGION?: string
    NEXT_PUBLIC_AWS_DYNAMO_DB_TABLE_NAME?: string

    // Google OAuth
    AUTH_GOOGLE_ID?: string
    AUTH_GOOGLE_SECRET?: string

    // Facebook OAuth
    AUTH_FACEBOOK_ID?: string
    AUTH_FACEBOOK_SECRET?: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}

interface ExtendedUser extends DefaultSession.user {
    role: "USER" | "ADMIN"
    firstName: string
    lastName: string
    imageUrl?: string
    email: string
    emailVerified: Date
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
        role?: "USER" | "ADMIN"
        firstName?: string
        lastName?: string
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
