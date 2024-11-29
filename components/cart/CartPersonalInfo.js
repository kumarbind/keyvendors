import React from "react";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
function CartPersonalInfo({ details, isEdit, handleEdit }) {
  let { name, email, phone, address } = details;
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start">
          <Grid item>
            <Grid sx={{ fontSize: 2 }} style={{ display: "flex" }}>
              <PersonIcon sx={{ fontSize: 20 }} />
              <Typography sx={{ ml: 1, fontSize: 14 }}>{name}</Typography>
            </Grid>
          </Grid>
          {email && (
            <Grid item>
              <Grid style={{ display: "flex" }}>
                <EmailIcon sx={{ fontSize: 20 }} />
                <Typography sx={{ ml: 1, fontSize: 14 }}>{email}</Typography>
              </Grid>
            </Grid>
          )}

          {phone && (
            <Grid item>
              <Grid style={{ display: "flex" }}>
                <LocalPhoneIcon sx={{ fontSize: 20 }} />
                <Typography sx={{ ml: 1, fontSize: 14 }}>{phone}</Typography>
              </Grid>
            </Grid>
          )}
          <Grid item>
            <Grid style={{ display: "flex" }}>
              <LocationOnIcon sx={{ fontSize: 20 }} />
              <Typography sx={{ ml: 1, fontSize: 14 }}>{address}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isEdit && (
        <Grid item>
          <Grid
            style={{ display: "flex", cursor: "pointer" }}
            onClick={() => handleEdit()}>
            <EditIcon sx={{ fontSize: 16, color: "green" }} />
            <Typography sx={{ ml: 1, fontSize: 13, color: "green" }}>
              Edit
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default CartPersonalInfo;
