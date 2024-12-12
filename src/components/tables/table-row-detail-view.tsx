import type { Trade } from "@/types/finance/trade"

import { cn } from "@/lib/utils"

type RowDetailViewProps = {
    trade: Trade
}

export default function RowDetailView(props: RowDetailViewProps) {
    const { trade } = props

    return (
        <div className="flex h-[150px] gap-4 p-2">
            <div className="w-[150px]">
                <img alt="Trade preview" className="h-full w-full object-cover" src="https://placehold.co/320x320" />
            </div>
            <div className="flex w-1/2 items-center text-left">
                <div className="space-y-1">
                    <p className="text-sm">
                        <span className="font-medium">Ticker:</span>{" "}
                        <span className="text-muted-foreground">{trade.ticker}</span>
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Date:</span>{" "}
                        <span className="text-muted-foreground">{trade.date.toString()}</span>
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Strike:</span>{" "}
                        <span className="text-muted-foreground">{trade.strike}</span>
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Profit/Loss:</span>{" "}
                        <span
                            className={cn(
                                "text-muted-foreground",
                                trade.profitLoss > 0 ? "text-green-600" : "text-red-600",
                            )}
                        >
                            {trade.profitLoss}
                        </span>
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Profit/Loss Percentage:</span>{" "}
                        <span
                            className={cn(
                                "text-muted-foreground",
                                trade.profitLossPercentage > 0 ? "text-green-600" : "text-red-600",
                            )}
                        >
                            {trade.profitLossPercentage}%
                        </span>
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Realized:</span>{" "}
                        <span className="text-muted-foreground">{trade.realized ? "Yes" : "No"}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
