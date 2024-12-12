export type Trade = {
    buyToClose: number
    contracts: number
    date: Date | string
    id: string
    profitLoss: number
    profitLossPercentage: number
    realized: "GAIN" | "LOSS"
    sellToOpen: number
    strike: number
    ticker: string
    type: "SELL_CALL" | "SELL_PUT"
}
