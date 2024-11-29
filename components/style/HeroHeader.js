import React from "react";
import {Box,Typography} from "@mui/material";

export function HeroHeader({ title,sx }) {

  const defaultSx={
    display: "flex",
    justifyContent: "center",
    alignContent:"center",
    alignItems:"center",
    height: "20rem",
    backgroundColor: "lightpink",
    overflow: "hidden",
    ...sx
  }
  return (
    <Box
      sx={defaultSx}>
      <Typography sx={{ textTransform:"capitalize"}} variant="h2">{title}</Typography>
    </Box>
  );
}
