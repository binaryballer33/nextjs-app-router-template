const tickers = [
    "AAPL",
    "GOOGL",
    "MSFT",
    "AMZN",
    "NVDA",
    "META",
    "TSLA",
    "NFLX",
    "INTC",
    "AMD",
    "PYPL",
    "ADBE",
    "CRM",
    "UBER",
    "LYFT",
    "TWTR",
    "SNAP",
    "COIN",
    "SQ",
    "SHOP",
]

// Function to generate a deterministic random number between 0 and 1
function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
}

// Function to generate a deterministic date between two dates
function randomDate(start: Date, end: Date, index: number): Date {
    const seed = index
    const randomValue = seededRandom(seed)
    return new Date(start.getTime() + randomValue * (end.getTime() - start.getTime()))
}

// Function to generate a deterministic random number within a range
function randomNumber(min: number, max: number, seed: number, precision: number = 2): number {
    const randomValue = seededRandom(seed)
    return Number((randomValue * (max - min) + min).toFixed(precision))
}

// Function to generate a deterministic stock trade
function generateRandomStockTrade(index: number) {
    // Define date ranges
    const earliestDate = new Date("2023-01-01")
    const latestDate = new Date("2024-03-01")

    // Generate purchase date using index as seed
    const datePurchased = randomDate(earliestDate, latestDate, index).toISOString().split("T")[0]

    // Determine if trade is closed using deterministic approach
    const isClosed = seededRandom(index * 2) < 0.7

    let dateSold: null | string = null
    let sellPrice: null | number = null
    let profitLoss: null | number = null
    let profitLossPercentage: null | number = null

    // Select ticker deterministically
    const tickerIndex = Math.floor(seededRandom(index * 3) * tickers.length)
    const ticker = tickers[tickerIndex]

    // Generate quantity and buy price deterministically
    const quantity = Math.floor(seededRandom(index * 4) * 191) + 10 // 10-200 shares
    const buyPrice = randomNumber(50, 500, index * 5)

    if (isClosed) {
        // Generate sell date deterministically
        const purchaseDate = new Date(datePurchased)
        const sellDate = new Date(purchaseDate)
        const daysToAdd = Math.floor(seededRandom(index * 6) * 174) + 7
        sellDate.setDate(purchaseDate.getDate() + daysToAdd)
        dateSold = sellDate.toISOString().split("T")[0]

        // Calculate sell price deterministically
        const priceVariation = randomNumber(-0.4, 0.4, index * 7)
        sellPrice = Number((buyPrice * (1 + priceVariation)).toFixed(2))

        // Calculate profit/loss
        profitLoss = Number(((sellPrice - buyPrice) * quantity).toFixed(2))
        profitLossPercentage = Number((((sellPrice - buyPrice) / buyPrice) * 100).toFixed(2))
    }

    // Calculate target prices
    const twentyPercentTarget = Number((buyPrice * 1.2).toFixed(2))
    const fortyPercentTarget = Number((buyPrice * 1.4).toFixed(2))
    const twentyPercentStopLoss = Number((buyPrice * 0.8).toFixed(2))
    const fortyPercentStopLoss = Number((buyPrice * 0.6).toFixed(2))

    return {
        buyPrice,
        datePurchased,
        dateSold,
        fortyPercentStopLoss,
        fortyPercentTarget,
        profitLoss,
        profitLossPercentage,
        quantity,
        sellPrice,
        status: isClosed ? "Closed" : "Open",
        ticker,
        twentyPercentStopLoss,
        twentyPercentTarget,
    }
}

// Generate 100 random stock trades with deterministic values
const randomStockTrades = Array.from({ length: 100 }, (_, index) => generateRandomStockTrade(index))
export default randomStockTrades
