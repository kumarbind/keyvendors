import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const UserButton = ({ text, isMobile, ...others }) =>
  isMobile && text !== "Sign in" ? (
    <>
      <AccountCircleIcon/>
      <Box sx={{ ml: 3,fontWeight:600 }}>Hi,{text}</Box>
    </>
  ) : (
    <Fab
      {...others}
      size="small"
      variant="extended"
      id="account-button"
      sx={{ width: "100%", width: "100%", ml: 2, textTransform: "none" }}>
      <AccountCircleIcon sx={{ ml: 2 }} />
      <Box sx={{ ml: 1, mr: 2 }}>{text}</Box>
    </Fab>
  );
