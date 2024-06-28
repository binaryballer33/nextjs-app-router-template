import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from 'src/utils/supabase/server'

// when a user signs up, they are sent an email with a link to verify their email address, this route handles the verification
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  // setup the redirect URL, defaulting to the homepage if no next URL is provided
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next

  // remove the token_hash and type from the URL, values are already stored in variables and not needed in the URL
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  // if the token_hash and type are present, verify the OTP using supabase client
  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    // if there is no error, redirect the user to the next URL if provided or the homepage
    if (!error) {
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
