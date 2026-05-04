import React from "react";
import { Box, Typography } from "@mui/material";

// Simple empty state presenter for reports.
function EmptyState(props) {
  var message = props.message;

  return (
    <Box
      sx={{
        py: 6,
        textAlign: "center",
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper"
      }}
    >
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}

export default EmptyState;
