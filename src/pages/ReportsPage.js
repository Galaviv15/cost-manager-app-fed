import React, { useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import EmptyState from "../components/EmptyState";
import ReportFilters from "../components/ReportFilters";
import ReportList from "../components/ReportList";
import { getReport, removeCost } from "../dal/db";
import useExchangeRates from "../hooks/useExchangeRates";
import { convertAmount } from "../utils/currency";

function ReportsPage() {
  var currencyIcons = {
    USD: "$",
    ILS: "₪",
    GBP: "£",
    EURO: "€"
  };
  var pieColors = [
    "#0f766e",
    "#f59e0b",
    "#16a34a",
    "#6366f1",
    "#ef4444",
    "#0ea5e9",
    "#a16207",
    "#0891b2"
  ];
  var now = new Date();
  var [filters, setFilters] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    currency: "USD"
  });
  var [refreshKey, setRefreshKey] = useState(0);
  var currencySymbol = currencyIcons[filters.currency] || "";

  var exchangeRates = useExchangeRates();
  // Memoize filtered report data for the selected period.
  var report = useMemo(function () {
    return getReport(filters.currency, filters.year, filters.month);
  }, [filters, refreshKey]);

  var categoryData = useMemo(function () {
    var totals = {};

    report.costs.forEach(function (cost) {
      var converted = convertAmount(
        cost.sum,
        cost.currency,
        filters.currency,
        exchangeRates.rates
      );
      totals[cost.category] = (totals[cost.category] || 0) + converted;
    });

    return Object.keys(totals).map(function (category) {
      return {
        name: category,
        value: Number(totals[category].toFixed(2))
      };
    });
  }, [exchangeRates.rates, filters.currency, report.costs]);

  var yearlyData = useMemo(function () {
    var results = [];

    for (var i = 1; i <= 12; i += 1) {
      var monthly = getReport(filters.currency, filters.year, i);
      results.push({
        month: i,
        total: monthly.convertedTotal.amount
      });
    }

    return results;
  }, [filters.currency, filters.year]);

  function handleFilterChange(name, value) {
    setFilters(function (prev) {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function handleRemove(index) {
    removeCost(index);
    setRefreshKey(function (prev) {
      return prev + 1;
    });
  }

  return (
    <Stack spacing={4}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Monthly Report
        </Typography>
        <ReportFilters
          year={filters.year}
          month={filters.month}
          currency={filters.currency}
          onChange={handleFilterChange}
        />
      </Paper>

      {exchangeRates.loading ? (
        <Paper sx={{ p: 6 }} elevation={3}>
          <Stack alignItems="center" spacing={2}>
            <CircularProgress />
            <Typography color="text.secondary">
              Loading exchange rates...
            </Typography>
          </Stack>
        </Paper>
      ) : (
        <Paper sx={{ p: 4 }} elevation={3}>
          {exchangeRates.error && (
            <Typography color="error" sx={{ mb: 2 }}>
              Using default exchange rates because the fetch failed.
            </Typography>
          )}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Total ({filters.currency})
          </Typography>
          <Typography variant="h4" sx={{ mb: 3, color: "#111827" }}>
            {currencyIcons[filters.currency]} {report.convertedTotal.amount}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {report.costs.length === 0 ? (
            <EmptyState message="No costs found for the selected month." />
          ) : (
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Detailed List
                </Typography>
                <ReportList
                  costs={report.costs}
                  currency={filters.currency}
                  rates={exchangeRates.rates}
                  onRemove={handleRemove}
                />
              </Box>
              <Box sx={{ height: 320 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Costs by Category
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={110}
                      label={function (entry) {
                        return (
                          entry.name + ": " + currencySymbol + entry.value
                        );
                      }}
                    >
                      {categoryData.map(function (entry, index) {
                        return (
                          <Cell
                            key={entry.name}
                            fill={pieColors[index % pieColors.length]}
                          />
                        );
                      })}
                    </Pie>
                    <Tooltip
                      formatter={function (value) {
                        return currencySymbol + Number(value).toFixed(2);
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              <Box sx={{ height: 320 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Yearly Overview
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData} margin={{ left: 16, right: 16 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      tickFormatter={function (value) {
                        return currencySymbol + Number(value).toFixed(2);
                      }}
                    />
                    <Tooltip
                      formatter={function (value) {
                        return [
                          currencySymbol + Number(value).toFixed(2),
                          "Total"
                        ];
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      align="left"
                      wrapperStyle={{ marginLeft: -8, marginBottom: 16 }}
                    />
                    <Bar dataKey="total" fill="#3b82f6" name="Total" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Stack>
          )}
        </Paper>
      )}
    </Stack>
  );
}

export default ReportsPage;
