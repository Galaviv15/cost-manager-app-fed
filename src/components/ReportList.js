import React from "react";
import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import {
  Category as CategoryIcon,
  DirectionsBus,
  Home,
  Delete,
  LocalHospital,
  Movie,
  Restaurant,
  School,
  ShoppingCart
} from "@mui/icons-material";
import { convertAmount } from "../utils/currency";

var CATEGORY_ICONS = {
  Food: Restaurant,
  Education: School,
  Health: LocalHospital,
  Housing: Home,
  Transport: DirectionsBus,
  Entertainment: Movie,
  Shopping: ShoppingCart,
  Other: CategoryIcon
};
var CURRENCY_ICONS = {
  USD: "$",
  ILS: "₪",
  GBP: "£",
  EURO: "€"
};

// Detailed list of costs for the selected month.
function ReportList(props) {
  var costs = props.costs;
  var currency = props.currency;
  var rates = props.rates;
  var onRemove = props.onRemove;

  return (
    <List>
      {costs.map(function (cost, index) {
        var converted = convertAmount(cost.sum, cost.currency, currency, rates);
        var Icon = CATEGORY_ICONS[cost.category] || CategoryIcon;

        return (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={cost.category + " - " + cost.description}
                secondary={new Date(cost.date).toLocaleDateString()}
              />
              <Typography variant="subtitle1">
                {converted.toFixed(2)} {CURRENCY_ICONS[currency]}
              </Typography>
              <IconButton
                aria-label="Remove cost"
                onClick={function () {
                  onRemove(cost.id);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        );
      })}
      {costs.length === 0 && (
        <Typography color="text.secondary">No costs to display.</Typography>
      )}
      {costs.length > 0 && (
        <Typography sx={{ mt: 2 }} color="text.secondary">
          Showing {costs.length} item(s) in {currency} view.
        </Typography>
      )}
    </List>
  );
}

export default ReportList;
