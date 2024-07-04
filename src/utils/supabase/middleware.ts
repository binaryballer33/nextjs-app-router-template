import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../secrets"

/*
  Docs: https://supabase.com/docs/guides/auth/server-side/nextjs
  Since Server Components can't write cookies, you need middleware to refresh expired Auth tokens and store them.

  The middleware is responsible for:
    Refreshing the Auth token (by calling supabase.auth.getUser).

    Passing the refreshed Auth token to Server Components, so they don't attempt to refresh the same token themselves. This is accomplished with request.cookies.set.

    Passing the refreshed Auth token to the browser, so it replaces the old token. This is accomplished with response.cookies.set
*/
export default async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        // Set the cookies on the request object
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))

        // Create a new response object with the request object that has the updated cookies
        supabaseResponse = NextResponse.next({
          request,
        })

        // Set the cookies on the response object
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.redirect(new URL("/login", request.url))

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!
  return supabaseResponse
}
