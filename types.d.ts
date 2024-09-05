import type { DefaultSession } from "@auth/core/types"

import "next-auth"
import "next-auth/jwt"

export interface Env {
    NEXT_PUBLIC_SUPABASE_REF_ID?: string
    NEXT_PUBLIC_SUPABASE_URL?: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string

    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID?: string

    NEXT_PUBLIC_RAPID_API_KEY?: string
    NEXT_PUBLIC_BACKEND_BASE_URL?: string

    NEXT_PUBLIC_AWS_ACCESS_KEY_ID?: string
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY?: string
    NEXT_PUBLIC_AWS_REGION?: string
    NEXT_PUBLIC_AWS_DYNAMO_DB_TABLE_NAME?: string

    DATABASE_URL?: string

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

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: { role: "USER" | "ADMIN" } & DefaultSession["user"]
    }

    /**
     *  JWT callback is able to use this user object
     */
    interface User extends DefaultSession.user {
        role: "USER" | "ADMIN"
    }
}

/**
 * The JWT callback token object now has a `role` property
 */
declare module "next-auth/jwt" {
    interface JWT {
        role?: "USER" | "ADMIN"
    }
}

declare module "@auth/core/types" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: {
            role: "USER" | "ADMIN"
        } & DefaultSession["user"]
    }
}
