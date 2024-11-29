import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function CartContainer(props) {
  const defaultSx = {
    position: "relative",
    mx:{md:"8rem",sm:"1rem",xs:"1rem"} ,
    mt: "-10rem",
    mb: "5rem",
    ...props.sx,
  };

  return (
    <>
      <Paper sx={defaultSx}>
        <Box align="center">{props.children}</Box>
      </Paper>
    </>
  );
}

export default CartContainer;
