import React, { useState } from "react";
import { Alert, Paper, Snackbar, Typography } from "@mui/material";
import CostForm from "../components/CostForm";
import { addCost } from "../dal/db";

// Add Cost screen with feedback via Snackbar.
function AddCostPage() {
  var [open, setOpen] = useState(false);

  function handleSubmit(cost) {
    addCost(cost);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Paper sx={{ p: 4 }} elevation={3}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Add a New Cost
      </Typography>
      <CostForm onSubmit={handleSubmit} />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          Cost saved successfully.
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default AddCostPage;
