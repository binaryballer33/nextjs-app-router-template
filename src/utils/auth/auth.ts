import NextAuth from "next-auth"

import authConfig from "src/utils/auth/auth-config/auth-config"

export const { handlers, auth, signIn, signOut } = NextAuth({ ...authConfig })
