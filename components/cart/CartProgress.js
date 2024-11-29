import React from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const PTitle = ({ value, selected }) => {
  return (
    <Typography
      sx={{
        borderBottom: selected ? ".2rem solid yellow" : "",
        display: "inline-block",        
        height: "2.5rem",
        mx: 2,
      }}
      component="span"
      variant={selected ? "h5" : "h6"}>
      {value}
    </Typography>
  );
};

function CartProgress({step,bgColor}) {
  const theme = useTheme();

  return (
    <Box
    component={"section"}
    sx={{
      display: { lg: "flex", xs: "none", md: "none" },
      flexDirection: "row",
      height: "20rem",
      backgroundColor: (theme) => bgColor?bgColor:theme.palette.primary.main,
      justifyContent: "center",
    }}>
    <Box
      sx={{
        display: "flex",
        pt: "5rem",
        height: "7.5rem",
        direction: "row",
        borderRadius:".1rem",
        borderBottom: `.2rem solid ${theme.palette.secondary.main}`,
        width: "37rem",
        justifyContent: "center",
      }}
      color={theme.palette.primary.text}>
      <PTitle value="Your Cart" selected={step=="cart"?true:false} />
      <PTitle value="Payment Details" selected={step=="payment"?true:false}/>
      <PTitle value=" Order Confirmation" selected={step=="confirmation"?true:false} />
    </Box>
    </Box>
  );
}

export default CartProgress;
