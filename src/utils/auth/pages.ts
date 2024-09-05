import type { PagesOptions } from "@auth/core/types"

// customize the pages that are used for the sign in and sign out, make it use your pages and not next auth's pages
const pages: Partial<PagesOptions> = {
    signIn: "/login",
    signOut: "/sign-out",
}

export default pages
