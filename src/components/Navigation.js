import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Tabs,
  Tab
} from "@mui/material";

// Primary navigation across application screens.
function Navigation(props) {
  var page = props.page;
  var onChange = props.onChange;

  function handleChange(event, value) {
    onChange(value);
  }

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ gap: 3, flexWrap: "wrap" }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Cost Manager
        </Typography>
        <Box sx={{ minWidth: 280 }}>
          <Tabs
            value={page}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            variant="fullWidth"
          >
            <Tab label="Add Cost" value="add" />
            <Tab label="Reports" value="reports" />
            <Tab label="Settings" value="settings" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
