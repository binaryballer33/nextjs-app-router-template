import type { NextRequest } from "next/server"

import { VerifyEmailSchema } from "src/types/forms/verify-email"

import { NextResponse } from "next/server"

import verifyEmail from "src/actions/emails/verify-email"

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    const body = await request.json()
    const { email, sixDigitCode } = VerifyEmailSchema.parse(body)

    if (!token) return NextResponse.json({ error: "No Token Provided", status: 400 })

    const response = await verifyEmail({ email, sixDigitCode, token })

    return NextResponse.json(response)
}
