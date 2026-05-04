# Cost Manager Front End - Final Project

## Project Identity & Team

**Team Members**

| First Name | Last Name | ID | Email |
| --- | --- | --- | --- |
|  |  |  |  |

**Live Demo:** [Add live demo link here](https://example.com)

**Video Presentation:** [Add YouTube link here](https://youtube.com)

## Development Stack

- Framework: React
- UI Library: MUI (Material UI)
- Logic: JavaScript (Professional JavaScript Style Guide)
- Storage: Browser Local Storage
- Testing: Vanilla db.js version used for automatic testing

## Functional Features Overview

- **Add Cost:** Form captures sum, currency, category, and description; the date is attached automatically.
- **Reports:** Monthly filtering by year and month with user-selected currency conversion.
- **Visualization:** Pie chart for category totals and bar chart for yearly totals.
- **Currency Management:** Fetch API integration for exchange rates with a default JSON file.

## Setup & Installation

**Prerequisites:** Optimized for Google Chrome (latest version).

**Running Locally:**

1. `npm install`
2. `npm start`

**Note:** Remove `node_modules` before packing for submission.

## Collaboration Tools Summary

GitHub managed source control and issue tracking, while Trello organized sprints and task ownership. Slack supported quick feedback loops and daily coordination. These tools kept the team aligned on priorities, milestones, and QA status without slowing development.

## Technical Documentation (DAL)

The data access layer (db.js) stores all costs in Local Storage and exposes:

- `openCostsDB(databaseName, databaseVersion)`
- `addCost(costObject)`
- `getReport(currency, year, month)`

## Project Structure

- `public/db.js`: Vanilla JavaScript db library for automated tests.
- `public/exchangeRates.json`: Default exchange rate file.
- `src/dal/db.js`: ES module version of db library used by React.
- `src/pages`: React screens for Add Cost, Reports, and Settings.
