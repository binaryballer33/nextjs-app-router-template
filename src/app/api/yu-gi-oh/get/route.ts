import type { NextRequest } from "next/server"
import type { ServerResponse } from "src/types/server-response"

import { NextResponse } from "next/server"

import getYuGiOhCardsQuery from "src/actions/yu-gi-oh/queries/get-yu-gi-oh-cards-query"

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get("page") || "0", 10)
    const limit = parseInt(searchParams.get("limit") || "50", 10)

    const yugiohCards = await getYuGiOhCardsQuery(page, limit)

    if (yugiohCards) {
        return NextResponse.json({
            cards: yugiohCards,
            message: `Successfully Fetched All ${yugiohCards.length} Yu-Gi-Oh Cards`,
            status: 200,
        } as ServerResponse)
    }

    return NextResponse.json({
        cards: [],
        message: `Error, Failed To Fetch Yu-Gi-Oh Cards, Check Your Query And Try Again:`,
        status: 500,
    } as ServerResponse)
}
