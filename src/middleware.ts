import { type NextRequest } from "next/server"

import updateSession from "src/utils/supabase/middleware"

/*
  Docs: https://supabase.com/docs/guides/auth/server-side/nextjs
  Since Server Components can't write cookies, you need middleware to refresh expired Auth tokens and store them.

  The middleware is responsible for:
    Refreshing the Auth token (by calling supabase.auth.getUser).

    Passing the refreshed Auth token to Server Components, so they don't attempt to refresh the same token themselves. This is accomplished with request.cookies.set.

    Passing the refreshed Auth token to the browser, so it replaces the old token. This is accomplished with response.cookies.set
*/

// just a wrapper around the updateSession middleware and a config matcher to filter out the paths where the middleware shouldn't run
export async function middleware(request: NextRequest) {
    return updateSession(request)
}

// run the middleware on the pages in the matcher
export const config = {
    matcher: ["/profile"],
}
