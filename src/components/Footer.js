import React from "react";
import { Box, Typography } from "@mui/material";
import { Copyright } from "@mui/icons-material";

// Footer with project attribution.
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        py: 3,
        textAlign: "center",
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        zIndex: 1200
      }}
    >
      <Typography variant="body2" color="text.secondary">
        <Copyright fontSize="inherit" sx={{ mr: 0.5 }} /> 2026
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Devevloped by Sagi, Betty and Gal
      </Typography>
    </Box>
  );
}

export default Footer;