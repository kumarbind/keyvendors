import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CartContainer from "./CartContainer";
import KeyCurrency from "components/style/KeyCurrency";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { Avatar, Typography, Badge } from "@mui/material";
import { TotalAmount } from "components/style/TotalAmount";
import {
  addCartItem,
  removeCartItem,
  removeCartState,
} from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import ImageWithFallback from "components/style/ImageWithFallback";
import { ccyFormat } from "utils/utility";
import QuantityBox from "components/services/QuantityBox";
import CouponBox from "../style/CouponBox";

const GItem = ({ value, sx, children }) => {
  let defaultSx = {
    minHeight: "7rem",
    minWidth: "19rem",
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
    px: 8,
    ...sx,
  };
  return <Box sx={defaultSx}>{children ? children : value}</Box>;
};

export default function CartItems({ cartItemsList, invoiceTotal,subTotal,couponDetail }) {
  const [update, setUpdate] = useState([]);
  const dispatch = useDispatch();

  const removeItem = (cid, index) => dispatch(removeCartState({ cid, index }));

  const handleCart = (service, category, action) => {
    dispatch(action({ service, category }));
  };

  const removeUpdate = (cid) => {
    setUpdate([...update].filter((rec) => rec !== cid));
  };

  const addUpdate = (cid) => {
    if (!update.includes(cid)) {
      setUpdate((prevState) => [...prevState, cid]);
    }
  };

  return (
    <CartContainer>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        aria-label="spanning table">
        <Grid
          item
          sx={{
            display: "flex",
            width: "100%",
            borderBottom: ".03rem solid hsla(0,0%,59.2%,.2)",
            justifyContent: "center",
          }}>
          <GItem value="Product Name" sx={{ fontWeight: 600 }} />
          <GItem value="Plan / Service Type" sx={{ fontWeight: 600 }} />
          <GItem value="Total Amount" sx={{ fontWeight: 600 }} />
        </Grid>
        {Object.keys(cartItemsList).map((key, index) => (
          <Grid
            key={index}
            item
            sx={{
              display: "flex",
              width: "100%",
              borderBottom: ".03rem solid hsla(0,0%,59.2%,.2)",
              justifyContent: "center",
            }}>
            <GItem>
              <Avatar
                onClick={() => addUpdate(key)}
                sx={{
                  width: 15,
                  height: 15,
                  p: 2,
                  mr: 4,
                  bgcolor: "#19857b",
                  cursor: "pointer",
                }}
                variant="rounded">
                <EditIcon sx={{ width: "1rem" }} fontSize=".1rem" />
              </Avatar>

              <ImageWithFallback
                alt={cartItemsList[key].title}
                src={cartItemsList[key].image}
                width={100}
                height={40}
              />
              <Typography sx={{ ml: 2, fontSize: 12 }}>
                {cartItemsList[key].title}
              </Typography>
            </GItem>
            <GItem>
              <Grid container>
                {cartItemsList[key].items.map((row, index) => (
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      borderBottom:
                        cartItemsList[key].items.length - index - 1
                          ? "1px dotted green"
                          : "",
                    }}
                    key={index}>
                    <GItem
                      sx={{
                        minHeight: "1rem",
                        justifyContent: "center",
                        width: "15rem",
                      }}>
                      <Typography component="div" sx={{ fontSize: 12 }}>
                        {row.title}
                        <Typography component="div" sx={{ fontSize: 10 }}>
                          {update.includes(key) ? (
                            <QuantityBox
                              remove={() =>
                                handleCart(
                                  row,
                                  { cid: key, title: cartItemsList[key].title },
                                  removeCartItem
                                )
                              }
                              add={() =>
                                handleCart(
                                  row,
                                  { cid: key, title: cartItemsList[key].title },
                                  addCartItem
                                )
                              }
                              quantity={row.qty}
                            />
                          ) : (
                            `(${row.qty} Qty)`
                          )}
                        </Typography>
                      </Typography>
                    </GItem>
                    <GItem sx={{ minHeight: "1rem" }}>
                      <GItem sx={{ minHeight: "1rem" }}>
                        <KeyCurrency
                          value={ccyFormat(row.amount)}
                          sx={{ fontWeight: 2 }}
                        />
                        {update.includes(key) ? (
                          <Typography
                            onClick={() => removeUpdate(key)}
                            sx={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "green",
                              cursor: "pointer",
                            }}>
                            Update
                          </Typography>
                        ) : (
                          <Button onClick={() => removeItem(key, index)}>
                            <Avatar
                              sx={{
                                width: 15,
                                height: 15,
                                p: 1,
                                bgcolor: "red",
                              }}
                              variant="circle">
                              <CancelIcon
                                sx={{ width: "2rem", bgcolor: "white" }}
                              />
                            </Avatar>
                          </Button>
                        )}
                      </GItem>
                    </GItem>
                  </Grid>
                ))}
              </Grid>
            </GItem>
          </Grid>
        ))}
        <Grid
          item
          justifyContent="end"
          sx={{
            display: "flex",
            width: "100%",
          }}>
          <Box>
            <GItem
              sx={{
                fontWeight: 500,
                alignItems: "flex-start",
                borderBottom: "none",
                px: 0,
                pt: 4,
                pr: 6,
              }}>
              <CouponBox sub_total={subTotal} couponDetail={couponDetail} />
            </GItem>
            <GItem
              sx={{
                fontWeight: 500,
                alignItems: "flex-start",
                borderBottom: "none",
                fontSize: "1rem",
                px: 0,
                pt: 1,
                pr: 6,
              }}>        
              <TotalAmount couponDetail={couponDetail} invoiceTotal={invoiceTotal} />     
            </GItem>
          </Box>
        </Grid>
      </Grid>
    </CartContainer>
  );
}
