import { createServerClient, type CookieOptions } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../secrets'

export function createClient(req: NextRequest): {
  supabaseClient: SupabaseClient
  res: NextResponse
} {
  // Create an unmodified response
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabaseClient = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        // If the cookie is updated, update the cookies for the request and response
        req.cookies.set({
          name,
          value,
          ...options,
        })
        res = NextResponse.next({
          request: {
            headers: req.headers,
          },
        })
        res.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: CookieOptions) {
        // If the cookie is removed, update the cookies for the request and response

        req.cookies.set({
          name,
          value: '',
          ...options,
        })
        res = NextResponse.next({
          request: {
            headers: req.headers,
          },
        })

        res.cookies.set({
          name,
          value: '',
          ...options,
        })
      },
    },
  })

  return { supabaseClient, res }
}
