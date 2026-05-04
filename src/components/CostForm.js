import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import {
  Category as CategoryIcon,
  DirectionsBus,
  Home,
  LocalHospital,
  Movie,
  Restaurant,
  School,
  ShoppingCart
} from "@mui/icons-material";

var CURRENCIES = ["USD", "ILS", "GBP", "EURO"];
var CURRENCY_ICONS = {
  USD: "$",
  ILS: "₪",
  GBP: "£",
  EURO: "€"
};
var CATEGORIES = [
  { label: "Food", icon: Restaurant },
  { label: "Education", icon: School },
  { label: "Health", icon: LocalHospital },
  { label: "Housing", icon: Home },
  { label: "Transport", icon: DirectionsBus },
  { label: "Entertainment", icon: Movie },
  { label: "Shopping", icon: ShoppingCart },
  { label: "Other", icon: CategoryIcon }
];

// Controlled form used to capture a new cost record.
function CostForm(props) {
  var onSubmit = props.onSubmit;
  var [values, setValues] = useState({
    sum: "",
    currency: "USD",
    category: "",
    description: "",
    date: new Date().toISOString().slice(0, 10)
  });
  var dateInputRef = useRef(null);
  var [errors, setErrors] = useState({});

  function handleChange(event) {
    var name = event.target.name;
    var value = event.target.value;

    setValues(function (prev) {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function validate() {
    var nextErrors = {};

    if (!values.sum || Number(values.sum) <= 0) {
      nextErrors.sum = "Enter a positive amount.";
    }

    if (!values.category.trim()) {
      nextErrors.category = "Category is required.";
    }

    if (!values.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      sum: Number(values.sum),
      currency: values.currency,
      category: values.category.trim(),
      description: values.description.trim(),
      date: values.date
    });

    setValues({
      sum: "",
      currency: "USD",
      category: "",
      description: "",
      date: new Date().toISOString().slice(0, 10)
    });
  }

  function renderCurrencyValue(selected) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography component="span">{CURRENCY_ICONS[selected]}</Typography>
        <Typography component="span">{selected}</Typography>
      </Box>
    );
  }

  function renderCategoryValue(selected) {
    var entry = CATEGORIES.find(function (category) {
      return category.label === selected;
    });
    var Icon = entry ? entry.icon : null;

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {Icon && <Icon fontSize="small" />}
        <Typography component="span">{selected}</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Sum"
            name="sum"
            value={values.sum}
            onChange={handleChange}
            type="number"
            fullWidth
            required
            error={Boolean(errors.sum)}
            helperText={errors.sum}
            inputProps={{ min: 0, step: "0.01" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Currency"
            name="currency"
            select
            value={values.currency}
            onChange={handleChange}
            fullWidth
            required
            SelectProps={{ renderValue: renderCurrencyValue }}
          >
            {CURRENCIES.map(function (currency) {
              return (
                <MenuItem key={currency} value={currency}>
                  <ListItemIcon>
                    <Typography component="span">
                      {CURRENCY_ICONS[currency]}
                    </Typography>
                  </ListItemIcon>
                  <ListItemText primary={currency} />
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Category"
            name="category"
            select
            value={values.category}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.category)}
            helperText={errors.category}
            SelectProps={{ renderValue: renderCategoryValue }}
          >
            {CATEGORIES.map(function (category) {
              var Icon = category.icon;

              return (
                <MenuItem key={category.label} value={category.label}>
                  <ListItemIcon>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={category.label} />
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            inputRef={dateInputRef}
            onClick={function () {
              if (dateInputRef.current && dateInputRef.current.showPicker) {
                dateInputRef.current.showPicker();
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="secondary">
            Add Cost
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CostForm;
