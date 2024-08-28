import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import getYuGiOhCardByIdQuery from "src/actions/yu-gi-oh/queries/get-yu-gi-oh-card-by-id-query"

type ContextProps = {
    params: {
        id: string
    }
}

// eslint-disable-next-line import/prefer-default-export
export async function GET(_request: NextRequest, { params }: ContextProps) {
    const id = parseInt(params.id, 10)

    try {
        const yugiohCard = await getYuGiOhCardByIdQuery(id)
        return NextResponse.json({
            card: yugiohCard,
            status: 200,
            message: "Successfully fetched all yu-gi-oh cards",
        })
    } catch (error) {
        return NextResponse.json({
            card: [],
            status: 500,
            message: `Error, Failed to fetch all yu-gi-oh cards: ${error}`,
        })
    }
}
