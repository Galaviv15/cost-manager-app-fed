import React, { useState } from "react";
import { Alert, Button, Paper, Snackbar, TextField, Typography } from "@mui/material";

var DEFAULT_URL = "/exchangeRates.json";

// Settings page for configuring exchange rate source.
function SettingsPage() {
  var [value, setValue] = useState(
    window.localStorage.getItem("exchangeRateUrl") || ""
  );
  var [open, setOpen] = useState(false);

  function handleSave() {
    var trimmed = value.trim();
    if (trimmed) {
      window.localStorage.setItem("exchangeRateUrl", trimmed);
    } else {
      window.localStorage.removeItem("exchangeRateUrl");
    }

    window.dispatchEvent(new Event("exchangeRateUrlUpdated"));
    setOpen(true);
  }

  function handleReset() {
    setValue("");
    window.localStorage.removeItem("exchangeRateUrl");
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          Settings updated.
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default SettingsPage;
