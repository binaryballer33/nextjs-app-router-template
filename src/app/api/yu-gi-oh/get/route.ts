import { NextRequest, NextResponse } from "next/server"

import getYuGiOhCardsQuery from "src/actions/yu-gi-oh/queries/get-yu-gi-oh-cards-query"

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get("page") || "0", 10)
    const limit = parseInt(searchParams.get("limit") || "50", 10)

    try {
        const yugiohCards = await getYuGiOhCardsQuery(page, limit)

        return NextResponse.json({
            cards: yugiohCards,
            status: 200,
            message: `Successfully Fetched All ${yugiohCards.length} Yu-Gi-Oh Cards`,
        })
    } catch (error) {
        return NextResponse.json({
            cards: [],
            status: 500,
            message: `Error, Failed To Fetch All Yu-Gi-Oh Cards: ${error}`,
        })
    }
}