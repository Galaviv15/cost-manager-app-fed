import { useEffect, useState } from "react";

var DEFAULT_URL = "/exchangeRates.json";
var DEFAULT_RATES = {
  USD: 1,
  ILS: 3.4,
  EURO: 0.7,
  GBP: 0.6
};

// Fetches exchange rates and stores them in local storage for the DAL.
function useExchangeRates() {
  var [state, setState] = useState({
    loading: true,
    rates: DEFAULT_RATES,
    error: null
  });

  useEffect(function () {
    function fetchRates() {
      var url = window.localStorage.getItem("exchangeRateUrl") || DEFAULT_URL;

      setState(function (prev) {
        return { ...prev, loading: true };
      });

      fetch(url)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Failed to fetch exchange rates.");
          }

          return response.json();
        })
        .then(function (data) {
          window.localStorage.setItem("exchangeRates", JSON.stringify(data));
          setState({ loading: false, rates: data, error: null });
        })
        .catch(function (error) {
          window.localStorage.setItem("exchangeRates", JSON.stringify(DEFAULT_RATES));
          setState({ loading: false, rates: DEFAULT_RATES, error: error.message });
        });
    }

    fetchRates();

    function handleRefresh() {
      fetchRates();
    }

    window.addEventListener("exchangeRateUrlUpdated", handleRefresh);

    return function () {
      window.removeEventListener("exchangeRateUrlUpdated", handleRefresh);
    };
  }, []);

  return state;
}

export default useExchangeRates;
