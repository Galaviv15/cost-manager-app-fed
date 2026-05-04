import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Chip, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";

var DEFAULT_URL = "https://gist.githubusercontent.com/Galaviv15/481a442e6e43e320fdc7f130c10acd46/raw/6990af9ab5c0f6b5a31919dfdb77978cebb865ee/rates.json";
var DEFAULT_RATES = {
  USD: 1,
  ILS: 3.4,
  EURO: 0.7,
  GBP: 0.6
};
var CURRENCY_ICONS = {
  USD: "$",
  ILS: "₪",
  GBP: "£",
  EURO: "€"
};

// Settings page for configuring exchange rate source.
function SettingsPage() {
  var [value, setValue] = useState(
    window.localStorage.getItem("exchangeRateUrl") || ""
  );
  var [open, setOpen] = useState(false);
  var [rates, setRates] = useState(DEFAULT_RATES);

  function fetchRates(url) {
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates.");
        }

        return response.json();
      })
      .then(function (data) {
        window.localStorage.setItem("exchangeRates", JSON.stringify(data));
        setRates(data);
      })
      .catch(function () {
        window.localStorage.setItem("exchangeRates", JSON.stringify(DEFAULT_RATES));
        setRates(DEFAULT_RATES);
      });
  }

  useEffect(function () {
    function loadRates() {
      var raw = window.localStorage.getItem("exchangeRates");
      if (!raw) {
        setRates(DEFAULT_RATES);
        return;
      }

      try {
        setRates(JSON.parse(raw));
      } catch (error) {
        setRates(DEFAULT_RATES);
      }
    }

    loadRates();

    function handleRefresh() {
      loadRates();
    }

    window.addEventListener("exchangeRateUrlUpdated", handleRefresh);

    return function () {
      window.removeEventListener("exchangeRateUrlUpdated", handleRefresh);
    };
  }, []);

  function handleSave() {
    var trimmed = value.trim();
    var urlToFetch = trimmed || DEFAULT_URL;
    if (trimmed) {
      window.localStorage.setItem("exchangeRateUrl", trimmed);
    } else {
      window.localStorage.removeItem("exchangeRateUrl");
    }

    fetchRates(urlToFetch);
    window.dispatchEvent(new Event("exchangeRateUrlUpdated"));
    setOpen(true);
  }

  function handleReset() {
    setValue("");
    window.localStorage.removeItem("exchangeRateUrl");
    fetchRates(DEFAULT_URL);
    window.dispatchEvent(new Event("exchangeRateUrlUpdated"));
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Paper sx={{ p: 4 }} elevation={3}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Settings
      </Typography>
      <Typography sx={{ mb: 2 }} color="text.secondary">
        Provide a custom exchange rate JSON URL or leave empty to use the default
        file at {DEFAULT_URL}.
      </Typography>
      <TextField
        label="Exchange Rate URL"
        value={value}
        onChange={function (event) {
          setValue(event.target.value);
        }}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Button variant="contained" color="secondary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="text" sx={{ ml: 2 }} onClick={handleReset}>
        Reset to Default
      </Button>
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          Current Currencies
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {Object.keys(rates).map(function (code) {
            return (
              <Chip
                key={code}
                label={CURRENCY_ICONS[code] + " " + code + " · " + rates[code]}
                sx={{ mb: 1 }}
              />
            );
          })}
        </Stack>
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          Settings updated.
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default SettingsPage;
