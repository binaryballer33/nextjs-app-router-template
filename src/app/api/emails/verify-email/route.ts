import type { NextRequest } from "next/server"

import { NextResponse } from "next/server"

import verifyEmail from "src/actions/verification-token/verify-email"

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) return NextResponse.json({ error: "No Token Provided", status: 400 })

    const response = await verifyEmail(token)

    return NextResponse.json(response)
}
