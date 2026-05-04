// Converts an amount using a USD-based exchange rate table.
export function convertAmount(amount, fromCurrency, toCurrency, rates) {
  var fromRate = rates[fromCurrency] || 1;
  var toRate = rates[toCurrency] || 1;
  var usdValue = Number(amount) / fromRate;

  return usdValue * toRate;
}
