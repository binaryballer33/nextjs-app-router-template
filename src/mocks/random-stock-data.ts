const tickers = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'NVDA',
  'META', 'TSLA', 'NFLX', 'INTC', 'AMD',
  'PYPL', 'ADBE', 'CRM', 'UBER', 'LYFT',
  'TWTR', 'SNAP', 'COIN', 'SQ', 'SHOP'
];

// Function to generate a random date between two dates
function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Function to generate a random number within a range
function randomNumber(min: number, max: number, precision: number = 2): number {
  return Number((Math.random() * (max - min) + min).toFixed(precision));
}

// Function to generate a random stock trade
function generateRandomStockTrade() {
  // Define date ranges
  const earliestDate = new Date('2023-01-01');
  const latestDate = new Date('2024-03-01');

  // Generate purchase date
  const datePurchased = randomDate(earliestDate, latestDate).toISOString().split('T')[0];

  // Determine if trade is closed (70% chance)
  const isClosed = Math.random() < 0.7;

  let dateSold: null | string = null;
  let sellPrice: null | number = null;
  let profitLoss: null | number = null;
  let profitLossPercentage: null | number = null;

  // Select random ticker
  const ticker = tickers[Math.floor(Math.random() * tickers.length)];

  // Generate quantity and buy price
  const quantity = Math.floor(Math.random() * 191) + 10; // 10-200 shares
  const buyPrice = randomNumber(50, 500);

  if (isClosed) {
    // Generate sell date within 7-180 days of purchase
    const purchaseDate = new Date(datePurchased);
    const sellDate = new Date(purchaseDate);
    sellDate.setDate(purchaseDate.getDate() + Math.floor(Math.random() * 174) + 7);
    dateSold = sellDate.toISOString().split('T')[0];

    // Calculate sell price with 10-40% variation
    const variation = randomNumber(0.9, 1.4);
    sellPrice = Number((buyPrice * variation).toFixed(2));

    // Calculate profit/loss
    const totalBuyCost = buyPrice * quantity;
    const totalSellValue = sellPrice * quantity;
    profitLoss = Number((totalSellValue - totalBuyCost).toFixed(2));
    profitLossPercentage = Number(((profitLoss / totalBuyCost) * 100).toFixed(2));
  }

  // Calculate target and stop loss prices
  const twentyPercentTarget = Number((buyPrice * 1.2).toFixed(2));
  const fortyPercentTarget = Number((buyPrice * 1.4).toFixed(2));
  const twentyPercentStopLoss = Number((buyPrice * 0.8).toFixed(2));
  const fortyPercentStopLoss = Number((buyPrice * 0.6).toFixed(2));

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
    status: isClosed ? 'Closed' : 'Open',
    ticker,
    twentyPercentStopLoss,
    twentyPercentTarget
  };
}

// Generate 100 random stock trades
const randomStockTrades = Array.from({ length: 100 }, generateRandomStockTrade);
export default randomStockTrades
