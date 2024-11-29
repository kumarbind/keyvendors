import React from "react";
import Box from "@mui/material/Box";
import CartAccordion from "../style/CartAccordion";

function AboutYourService(props) {
  return (
    <CartAccordion id="verify-number" title="About your service">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
        }}>
        <Box>
          We ensure that vendor appointments are scheduled at a convenient time
          for you, so you don&apos;t have to wait around for service providers.
        </Box>

        <Box
          sx={{
            mt: 2,
          }}>
          We prioritize punctuality, and our vendors strive to arrive at your
          home on schedule, minimizing any disruption to your daily routine.
        </Box>
        <Box
          sx={{
            mt: 2,
          }}>
          We offer a variety of payment options, including credit/debit card,
          digital wallets, and cash on delivery, to make payment for the
          services as convenient as possible for you.
        </Box>
      </Box>
    </CartAccordion>
  );
}

export default AboutYourService;
