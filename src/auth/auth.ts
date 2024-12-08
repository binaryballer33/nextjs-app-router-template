import NextAuth from "next-auth"

import authConfig from "@/auth/auth-config/auth-config"

/*
 * TODO: My Next Auth TODOS
 *  - next-auth/react signIn method when using OAuth causes refresh, so can't really see toast message
 *  - when user verifies email, redirect or close browser tab
 *  - figure out how to make auth state change on sign in reflect across app without refresh
 *  - take user to sign out page when sign-out button is clicked ( I think refresh is preventing this ), then after
 *    a few seconds take user to home page, you've done this before in world travelers or mas food market project
 *
 */
export const { auth, handlers, signIn, signOut } = NextAuth({ ...authConfig })
