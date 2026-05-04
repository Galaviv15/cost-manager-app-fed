### Cost Manager Web Application

# Project Overview -
The goal is to develop a front-end application for managing personal costs. 
The application will be built using React, MUI, and Vanilla JavaScript for the data layer. 
All data must be persisted in the browser's Local Storage.

# System Architecture -
## UI Layer: 
Developed with React and MUI (Material UI) components.
## Data Access Layer (DAL): 
A custom-built library named db.js.
  ### Version A (React): 
  Compatible with ES modules for integration into the React app.
  ### Version B (Vanilla): 
  A standalone JS file for automatic testing (no module exports).
## External Integration: 
Currency exchange rates fetched via Fetch API from a user-defined or default server-side JSON file.

# Functional Requirements -
## Cost Management -
  ### Add Cost: 
  Users must be able to input the following fields:
   - Sum (Number).
   - Currency (Options: USD, ILS, GBP, EURO).
   - Category (String).
   - Description (String).
  ### Automatic Data Generation: 
  The system must attach the current date to every cost item at the moment it is added.
## Reports & Visualization - 
  ### Monthly Report: 
  A detailed list of costs for a specific month and year, displayed in a user-selected currency.
  ### Pie Chart: 
  A visual breakdown of total costs by category for a selected month/year.
  ### Bar Chart: 
  A visual representation of total costs for each of the 12 months in a selected year.
  ### Dynamic Conversion: 
  All charts and reports must support on-the-fly currency conversion based on fetched exchange rates.
## Configuration (Settings) -
  ### Exchange Rate URL: 
  A settings screen where users can specify a custom URL for the exchange rate JSON.
  ### Default Behavior: 
  If no URL is provided, the app must use a default server-side URL hosting a static JSON file.
  On the JSON file, the currencies will be:
  ILS 3.4 = USD 1 (meaning: 3.4 ILS are equivalent to 1 USD)
  EURO 0.7 = USD 1 (meaning: 0.7 EURO is equivalent to 1 USD)
  GBP 0.6 = USD 1 (meaning: 0.6 GBP is equivalent to 1 USD)
  USD 1 = USD 1 

# Technical Specifications for db.js (Vanilla Version) -
The library must expose a global db object with the following methods:
  ## openCostsDB(databaseName, databaseVersion):
   - Initializes/opens the Local Storage "database".
   - Returns a reference to the database object.
  ## addCost(costObject):
   - Saves an object containing sum, currency, category, and description.
   - Returns the saved object.
  ## getReport(currency, year, month):
   - Retrieves data filtered by month/year.
   - If year/month are omitted, defaults to the current date.
   - Returns an object structure including a costs array and a converted total object.

# Design & Theming Specifications
  ## Visual Identity & Material Design
   - Design System: 
   The user interface must be strictly implemented using MUI (Material UI) components to ensure consistency with Material Design principles.
   - Typography: 
   The application should utilize the default MUI typography provider, prioritizing clean, sans-serif fonts (e.g., Roboto) for high readability in a financial context.
   - Color Palette: 
   A custom theme should be defined using MUI's createTheme utility.
     - Primary Color: A professional "Finance" tone (e.g., Navy Blue or Forest Green) for headers and primary actions.
     - Secondary Color: A contrasting accent color for highlights and call-to-action buttons.
  ## Layout & Responsiveness - 
   - Desktop Optimization: 
   While the primary requirement is compatibility with desktop browsers, the layout must be structured using the MUI Grid or Stack systems to ensure organized content distribution.
   - Navigation: 
   A persistent navigation element (e.g., a Sidebar or Top App Bar) must be present to allow seamless switching between "Add Cost," "Reports," and "Settings" screens.
  ## Data Visualization Styling - 
   - Chart Aesthetics: 
   Pie and Bar charts must use a distinct color scale for categories to ensure clarity.
   - Empty States: 
   The UI must include styled "Empty State" components (e.g., MUI Typography or Icons) to inform the user when no data is available for a selected period.
  ## User Experience (UX) Feedback -
   - Interaction Feedback: 
   Use MUI Snackbar or Alert components to provide immediate visual confirmation after successful actions, such as adding a new cost.
   - Loading Indicators: 
   During data fetching (e.g., retrieving currency exchange rates), the application must display MUI CircularProgress or Skeleton components to improve perceived performance.
   - Form Validation: 
   Input fields (Textfields) should utilize MUI's error state and helperText to provide real-time validation feedback for incorrect data entries.

# Non-Functional Requirements -
  ## Code Style: 
 Must strictly follow the Professional JavaScript Style Guide.
  ## Comments: 
  Meaningful comments are mandatory throughout the codebase.
  ## Browser Support: 
  Optimized and tested specifically for the latest version of Google Chrome.



###### README File - 
1. Project Identity & Team
Title: "Cost Manager Front End - Final Project".    

Team Members: A table or list containing the First Name, Last Name, ID, and Email Address of every member.  

Live Demo: A clickable link to the hosted application (e.g., Render URL).  

Video Presentation: A clickable link to the unlisted YouTube demonstration video (max 60 seconds).  

2. Development Stack
Framework: React.  

UI Library: MUI (Material UI).  

Logic: JavaScript (following the Professional JavaScript Style Guide).  

Storage: Browser Local Storage.  

Testing: Mentions of the db.js vanilla version used for automatic testing.  

3. Functional Features Overview
Add Cost: Description of the entry form (Sum, Currency, Category, Description).  

Reports: Explanation of the monthly filtering and currency selection logic.  

Visualization: Details on the Pie Chart (Categories) and Bar Chart (Yearly overview).  

Currency Management: Documentation of the Fetch API integration and the exchange rate JSON structure.  

4. Setup & Installation
Prerequisites: Mentioning that the project is optimized for Google Chrome (latest version).  

Running Locally:

npm install (to install dependencies).  

npm start (to launch the React development server).  

Note: Remind users to remove node_modules before packing for submission.  

5. Collaboration Tools Summary
A dedicated section summarizing the use of at least two collaborative tools (e.g., GitHub, Trello, Slack).  

Constraint: This summary must be no more than 100 words.  

6. Technical Documentation (DAL)
Briefly explain the structure of the db.js library.  

List the core methods: openCostsDB, addCost, and getReport.  

README Style Guidelines
Dynamic: Make sure to update the README file on every change that been made (if needed), this file should match the updated project files.

Scannability: Use Markdown headers (#, ##), bullet points, and tables.  

Language: The UI and documentation should be in English.  

Professionalism: Ensure the tone is technical and concise, reflecting the coding standards of the course.
