# Cost Manager Front End - Final Project

## Project Identity & Team

**Team Members**

| First Name | Last Name | ID | Email |
| --- | --- | --- | --- |
| Gal | Aviv | 206510505 | galaviv15@gmail.com |
| Sagi | Reuven | 206562712 | Sagi98rev@gmail.com |
| Betty | Halmish | 209363555 | Betty.Hv1@gmail.com |

**Live Demo:** [https://cost-manager-fed.netlify.app/](https://example.com)

**Video Presentation:** [https://youtu.be/oLQ7DP8vdFE](https://youtube.com)

## Development Stack
- Framework: React
- UI Library: MUI (Material UI)
- Logic: JavaScript (Professional JavaScript Style Guide)
- Storage: Browser Local Storage
- Testing: Vanilla db.js version used for automatic testing

## Functional Features Overview

- **Add Cost:** Form captures sum, currency, category, date and description.
- **Reports:** Monthly filtering by year and month with user-selected currency conversion.
- **Visualization:** Pie chart for category totals and bar chart for yearly totals.
- **Currency Management:** Fetch API integration for exchange rates with a default JSON file.

## Setup & Installation

**Prerequisites:** Optimized for Google Chrome (latest version).

**Running Locally:**

1. `npm install`
2. `npm start`


## Collaboration Tools Summary
Our team maintained a streamlined workflow using Git for version control, ensuring code integrity and seamless feature integration. Monday.com served as our central project management hub, where we tracked sprints, assigned tasks, and monitored deadlines through visual boards and automations. To maintain real-time coordination, we used Discord for quick feedback loops and pair-programming sessions. This integrated stack kept us aligned on priorities and milestones throughout the development process.

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
