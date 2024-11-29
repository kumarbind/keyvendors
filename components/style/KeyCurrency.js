import * as React from "react";
import Typography from "@mui/material/Typography";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Box from "@mui/material/Box";

const KeyCurrency = ({ value, ...rest }) => {
  const sxValue = {
    display: "inline-flex",
    fontSize: "1.1rem",
    fontWeight: "900",
    ...rest.sx,
  };

  return (
    <Box sx={sxValue} direction="row" alignItems={"center"}>
      <CurrencyRupeeIcon fontSize="20px" />
      <Typography
        sx={{
          fontSize: "inherit",
          fontWeight: "inherit",
          mr: 2,
        }}
        component="span"
        color="text.secondary">
        {value}
      </Typography>
    </Box>
  );
};

export default KeyCurrency;
