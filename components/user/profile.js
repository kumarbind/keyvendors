import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PasswordIcon from "@mui/icons-material/Password";
import { Box, Grid, Typography } from "@mui/material";
import CartContainer from "components/cart/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "services/api";
import { getAuthInfo, updateInfo } from "../../store/authSlice";
import { EditAddress } from "./EditAddress";

function Profile(props) {
  const authInfo = useSelector(getAuthInfo);
  const dispatch = useDispatch();

  const handelRefresh = async () => {
    let res = await fetchData(`user`);
    dispatch(updateInfo(res));
  };
  return (
    <>
      <CartContainer sx={{ mt: 3, p: 3 }}>
        <Grid
          sx={{ display: "flex" }}
          direction={"row"}
          justifyContent="start"
          container>
          <Grid item xs={12}>
            <Box>
              <Typography component="div" variant="h6">
                {authInfo.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography component="div">
                <EmailIcon />
                {authInfo.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <LocalPhoneIcon /> {authInfo.phone}
          </Grid>
          <Grid item xs={12}>
            <PasswordIcon /> Change Password
          </Grid>
        </Grid>
      </CartContainer>
      <CartContainer sx={{ mt: 1, p: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <Box>
              <Typography component="div" variant="h6">
                Address
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography component="div">
                {authInfo.address && (
                  <>
                    <LocationOnIcon />
                    {authInfo.address} {authInfo.city} ({authInfo.pincode}){" "}
                    {authInfo.landmark}
                  </>
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography component="div">
                <EditAddress handelRefresh={handelRefresh} actionTitle={authInfo.address?"Edit":"Add"}/>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CartContainer>
    </>
  );
}

export default Profile;
