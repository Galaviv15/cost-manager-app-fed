var DEFAULT_DB_NAME = "costs-db";
var COSTS_KEY_SUFFIX = "-costs";
var META_KEY_SUFFIX = "-meta";
var DEFAULT_RATES = {
  USD: 1,
  ILS: 3.4,
  EURO: 0.7,
  GBP: 0.6
};

var currentDbName = DEFAULT_DB_NAME;

function getCostsKey() {
  return currentDbName + COSTS_KEY_SUFFIX;
}

function getMetaKey() {
  return currentDbName + META_KEY_SUFFIX;
}

function readJson(key, fallbackValue) {
  var raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallbackValue;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallbackValue;
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function generateId() {
  return "cost_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Initializes or opens the local storage database.
export function openCostsDB(databaseName, databaseVersion) {
  currentDbName = databaseName || DEFAULT_DB_NAME;

  var meta = {
    name: currentDbName,
    version: databaseVersion || 1,
    openedAt: new Date().toISOString()
  };

  writeJson(getMetaKey(), meta);

  if (!window.localStorage.getItem(getCostsKey())) {
    writeJson(getCostsKey(), []);
  }

  return meta;
}

// Adds a cost entry and automatically attaches a date.
export function addCost(costObject) {
  var costs = readJson(getCostsKey(), []);
  var resolvedDate = costObject.date
    ? new Date(costObject.date).toISOString()
    : new Date().toISOString();

  var newCost = {
    id: costObject.id || generateId(),
    sum: Number(costObject.sum),
    currency: costObject.currency,
    category: costObject.category,
    description: costObject.description,
    date: resolvedDate
  };

  costs.push(newCost);
  writeJson(getCostsKey(), costs);

  return newCost;
}

function getExchangeRates() {
  return readJson("exchangeRates", DEFAULT_RATES);
}

function convertAmount(amount, fromCurrency, toCurrency, rates) {
  var fromRate = rates[fromCurrency] || 1;
  var toRate = rates[toCurrency] || 1;
  var usdValue = Number(amount) / fromRate;

  return usdValue * toRate;
}

// Retrieves a filtered report and returns the converted total.
export function getReport(currency, year, month) {
  var costs = readJson(getCostsKey(), []);
  var needsWrite = false;

  costs = costs.map(function (cost) {
    if (!cost.id) {
      needsWrite = true;
      return { ...cost, id: generateId() };
    }

    return cost;
  });

  if (needsWrite) {
    writeJson(getCostsKey(), costs);
  }
  var now = new Date();
  var targetYear = typeof year === "number" ? year : now.getFullYear();
  var targetMonth = typeof month === "number" ? month : now.getMonth() + 1;
  var rates = getExchangeRates();

  var filtered = costs.filter(function (cost) {
    var costDate = new Date(cost.date);
    return costDate.getFullYear() === targetYear && costDate.getMonth() + 1 === targetMonth;
  });

  var total = filtered.reduce(function (sum, cost) {
    return sum + convertAmount(cost.sum, cost.currency, currency, rates);
  }, 0);

  return {
    currency: currency,
    year: targetYear,
    month: targetMonth,
    costs: filtered,
    convertedTotal: {
      currency: currency,
      amount: Number(total.toFixed(2))
    }
  };
}

// Removes a cost by index (stable for the current storage snapshot).
export function removeCost(costId) {
  var costs = readJson(getCostsKey(), []);

  var index = costs.findIndex(function (cost) {
    return cost.id === costId;
  });

  if (index === -1) {
    return null;
  }

  var removed = costs.splice(index, 1)[0];
  writeJson(getCostsKey(), costs);

  return removed;
}
