import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Avatar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import CartContainer from "components/cart/CartContainer";
import CartPersonalInfo from "components/cart/CartPersonalInfo";
import CartProgress from "components/cart/CartProgress";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { fetchData } from "services/api";
import { getAuthInfo,logout } from "../../store/authSlice";
import { clearCustomerDetail } from "../../store/cartSlice";
import CartAccordion from "../style/CartAccordion";
import AboutYourService from "./AboutYourService";
import { useIsLarge } from "utils/hooks";
import { OrderItem } from "./OrderItem";
import CancellationPolicy from "./CancellationPolicy";

function OrderConfirm({ transactionId }) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]);
  const [flatBuilding, setFlatBuilding] = useState(null);
  const authInfo = useSelector(getAuthInfo);
  const isLarge = useIsLarge();
  const logoutUser = () => {
    dispatch(logout(null));
    dispatch(clearCustomerDetail());
    Router.push("/login");
  };
  const fetchOrder = useCallback(async () => {
    try {
      let res = await fetchData(`order_details/${transactionId}`);
      console.log(res)

      if (res.error !== undefined && res.statusCode == 401) {

        logoutUser();
      } else {
        setFlatBuilding(res.orders[0]["flat_building"]);
        setOrder(res.orders);
      }
    } catch (error) {
      console.error(error);
    }
  }, [transactionId]);

  useEffect(() => {
    if (authInfo === null) {
      Router.push("/login");
    } else {
      if (transactionId) {
        (async () => await fetchOrder())();
      }
    }
  }, [transactionId, authInfo, fetchOrder]);

  return (
    <>
      <CartProgress step="confirmation" />
      <CartContainer sx={{ mt: isLarge ? "-10rem" : 4 }}>
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="start">
          <Grid
            lg={12}
            md={12}
            xs={12}
            item
            sx={{
              display: "flex",
              borderBottom: ".03rem solid hsla(0,0%,59.2%,.2)",
            }}>
            <Box sx={{ ml: 1 }}>
              <Button sx={{ minWidth: 0, p: 0, cursor: "default" }}>
                <Avatar
                  sx={{ width: 15, height: 15, p: 2, bgcolor: "#19857b" }}
                  variant="rounded">
                  <AssignmentTurnedInIcon
                    sx={{ width: ".5em" }}
                    fontSize=".01rem"
                  />
                </Avatar>
                <Typography sx={{ p: 2 }}>Booking Accepted</Typography>
              </Button>
            </Box>
          </Grid>
          {order.map((ord, index) => (
            <Grid
              key={index}
              lg={12}
              md={12}
              xs={12}
              item
              sx={{
                py: 2,
                px: 1,
                display: "flex",
                borderBottom: ".03rem solid hsla(0,0%,59.2%,.2)",
              }}>
              <OrderItem order={ord} callBack={fetchOrder} />
            </Grid>
          ))}
        </Grid>
      </CartContainer>

      {authInfo && (
        <CartAccordion id="personal-details" title="Personal details">
          <CartPersonalInfo
            details={{
              name: authInfo.name,
              email: authInfo.email,
              phone: authInfo.phone,
              address: flatBuilding,
            }}
          />
        </CartAccordion>
      )}
      <AboutYourService />
      <CancellationPolicy/>
    </>
  );
}

export default OrderConfirm;
