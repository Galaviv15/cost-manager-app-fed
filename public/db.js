//Vanilla JS Version

(function () {
  "use strict";

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

  function openCostsDB(databaseName, databaseVersion) {
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

    return {
      addCost: addCost,
      getReport: getReport,
      removeCost: removeCost
    };
  }

  function addCost(costObject) {
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
// If the currencies are identical, return the original amount immediately
  if (fromCurrency === toCurrency) {
    return Number(amount);
  }
// Retrieve rates from the rates object, defaulting to 1 (USD) if not found
  var fromRate = (rates && rates[fromCurrency]) ? rates[fromCurrency] : 1;
  var toRate = (rates && rates[toCurrency]) ? rates[toCurrency] : 1;

// Convert the amount to a base USD value first, then convert to the target currency
// Formula: (Amount / Source Rate) * Target Rate
  var usdValue = Number(amount) / fromRate;
  return usdValue * toRate;
}

  function getReport(currency, year, month) {
    var costs = readJson(getCostsKey(), []);

    var now = new Date();
    var targetYear = typeof year === "number" ? year : now.getFullYear();
    var targetMonth = typeof month === "number" ? month : now.getMonth() + 1;
    var rates = getExchangeRates();

    var filtered = costs.filter(function (cost) {
      var costDate = new Date(cost.date);
      return costDate.getFullYear() === targetYear && costDate.getMonth() + 1 === targetMonth;
    });

    var totalAmount = filtered.reduce(function (sum, cost) {
      return sum + convertAmount(cost.sum, cost.currency, currency, rates);
    }, 0);

    return {
      currency: currency,
      year: targetYear,
      month: targetMonth,
      costs: filtered,
      total: {
        currency: currency,
        sum: Number(totalAmount.toFixed(2))
      }
    };
  }

  function removeCost(costId) {
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

  window.db = {
    openCostsDB: openCostsDB,
    addCost: addCost,
    getReport: getReport,
    removeCost: removeCost
  };
})();
