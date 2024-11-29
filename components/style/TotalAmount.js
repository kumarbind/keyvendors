// @flow
import * as React from "react";
import { Box, Typography } from "@mui/material";
import KeyCurrency from "components/style/KeyCurrency";

export function TotalAmount({ couponDetail, invoiceTotal }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography component="div">
        Total:
        <Typography
          component="span"
          sx={{
            fontSize: ".5rem",
            marginRight: "1rem",
            marginTop: ".2rem",
          }}>
          (Inc. taxes)
        </Typography>
      </Typography>
      <Typography component="div" sx={{ display: "flex" }}>
        {couponDetail && (
          <>
            <KeyCurrency
              sx={{ fontSize: "inherit" }}
              value={`${couponDetail.subTotal}`}
            />
            <Typography  sx={{ mr: 1 }}>-</Typography>
            <KeyCurrency
              sx={{ fontSize: "inherit" }}
              value={couponDetail.discount}
            />
            =
          </>
        )}
        <KeyCurrency sx={{ fontSize: "inherit" }} value={invoiceTotal} />
      </Typography>
    </Box>
  );
}
