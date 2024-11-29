import React from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Grid, Typography } from "@mui/material";
function QuantityBox({remove,quantity,add}) {

  return (
    <Grid
      container
      sx={{minWidth: "4rem",}}
      justifyContent="space-between"
      >
      <Grid item>
        <RemoveCircleIcon sx={{ cursor:"pointer" }} onClick={()=>remove()}/>
      </Grid>
      <Grid item>
        <Typography>{quantity}</Typography>
      </Grid>
      <Grid item>
        <AddCircleIcon sx={{ cursor:"pointer" }} onClick={()=>add()} />
      </Grid>
    </Grid>
  );
}

export default QuantityBox;
