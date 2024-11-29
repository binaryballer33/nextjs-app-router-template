import type { NextRequest } from "next/server"
import type { ServerResponse } from "@/types/server-response"

import { NextResponse } from "next/server"

import getYuGiOhCardByIdQuery from "@/actions/yu-gi-oh/queries/get-yu-gi-oh-card-by-id-query"

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
            card: yugiohCard,
            message: `Successfully Fetched Yu-Gi-Oh Card With Id: ${id}`,
            status: 200,
        } as ServerResponse)
    }

    return NextResponse.json({
        card: null,
        message: `Error, Failed To Fetch Yu-Gi-Oh Card With Id: ${id}`,
        status: 500,
    } as ServerResponse)
}
