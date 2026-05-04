import React from "react";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";

var CURRENCIES = ["USD", "ILS", "GBP", "EURO"];
var CURRENCY_ICONS = {
  USD: "$",
  ILS: "₪",
  GBP: "£",
  EURO: "€"
};

// Shared filter controls for report selection.
function ReportFilters(props) {
  var year = props.year;
  var month = props.month;
  var currency = props.currency;
  var onChange = props.onChange;

  function handleChange(event) {
    var name = event.target.name;
    var value = Number(event.target.value) || event.target.value;
    onChange(name, value);
  }

  function renderCurrencyValue(selected) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography component="span">{CURRENCY_ICONS[selected]}</Typography>
        <Typography component="span">{selected}</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TextField
          label="Year"
          name="year"
          value={year}
          onChange={handleChange}
          type="number"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          label="Month"
          name="month"
          value={month}
          onChange={handleChange}
          type="number"
          fullWidth
          inputProps={{ min: 1, max: 12 }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          label="Currency"
          name="currency"
          select
          value={currency}
          onChange={handleChange}
          fullWidth
          SelectProps={{ renderValue: renderCurrencyValue }}
        >
          {CURRENCIES.map(function (entry) {
            return (
              <MenuItem key={entry} value={entry}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography component="span">{CURRENCY_ICONS[entry]}</Typography>
                  <Typography component="span">{entry}</Typography>
                </Box>
              </MenuItem>
            );
          })}
        </TextField>
      </Grid>
    </Grid>
  );
}

export default ReportFilters;
