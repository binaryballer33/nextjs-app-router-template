import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import getYuGiOhCardByIdQuery from "src/actions/yu-gi-oh/queries/get-yu-gi-oh-card-by-id-query"
import type { ServerResponse } from "src/models/server-response"

type ContextProps = {
    params: {
        id: string
    }
}

// eslint-disable-next-line import/prefer-default-export
export async function GET(_request: NextRequest, { params }: ContextProps) {
    const id = parseInt(params.id, 10)

    const yugiohCard = await getYuGiOhCardByIdQuery(id)

    if (yugiohCard) {
        return NextResponse.json({
            status: 200,
            message: `Successfully Fetched Yu-Gi-Oh Card With Id: ${id}`,
            card: yugiohCard,
        } as ServerResponse)
    }

    return NextResponse.json({
        status: 500,
        message: `Error, Failed To Fetch Yu-Gi-Oh Card With Id: ${id}`,
        card: null,
    } as ServerResponse)
}
