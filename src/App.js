import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AddCostPage from "./pages/AddCostPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import { openCostsDB } from "./dal/db";

var PAGES = {
  add: "add",
  reports: "reports",
  settings: "settings"
};

function App() {
  var [page, setPage] = useState(PAGES.add);

  useEffect(function () {
    // Ensure the local storage database is initialized at startup.
    openCostsDB("costs-db", 1);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navigation page={page} onChange={setPage} />
      <Container sx={{ py: 4, pb: 14 }} maxWidth="lg">
        {page === PAGES.add && <AddCostPage />}
        {page === PAGES.reports && <ReportsPage />}
        {page === PAGES.settings && <SettingsPage />}
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
