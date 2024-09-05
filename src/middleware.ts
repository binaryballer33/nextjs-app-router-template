import NextAuth from "next-auth"
import Facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"

/*
 * Due to prisma not working on the edge, you need to instantiate the auth client without the adapter here
 * More Information in the docs: https://authjs.dev/guides/edge-compatibility
 */
export const { auth: middleware } = NextAuth({
    providers: [Google, Facebook],
})

// run the middleware on the pages in the matcher
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/profile"],
    // matcher: ["/profile"],
}
