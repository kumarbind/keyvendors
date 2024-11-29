import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CartAccordion from "../style/CartAccordion";

function CancellationPolicy(props) {
  return (
    <CartAccordion id="verify-number" title="Cancellation Policy">
      <Box
           sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "start",
          }}>
        <Box
      >
          In some cases, customers may have the option to reschedule their home
          service booking instead of canceling. Rescheduling is subject to
          availability and terms specified in our rescheduling policy.
        </Box>
        <Box
          sx={{
            mt: 2,
          }}>
          If a refund is applicable due to a cancellation, we will promptly
          process the refund according to our refund policy. The time it takes
          to receive the refund may vary based on the payment method used.
        </Box>
      </Box>
    </CartAccordion>
  );
}

export default CancellationPolicy;
