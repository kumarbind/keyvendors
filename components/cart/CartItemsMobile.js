import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import QuantityBox from "components/services/QuantityBox";
import ImageWithFallback from "components/style/ImageWithFallback";
import KeyCurrency from "components/style/KeyCurrency";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ccyFormat } from "utils/utility";
import CouponBox from "../style/CouponBox";
import { TotalAmount } from "components/style/TotalAmount";
import { addCartItem, removeCartItem } from "../../store/cartSlice";
import CartContainer from "./CartContainer";

const GItem = ({ value, sx, children }) => {
  let defaultSx = {
    py: ".5rem",
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
    mx: 1,
    ...sx,
  };
  return <Box sx={defaultSx}>{children ? children : value}</Box>;
};

export default function CartItemsMobile({ cartItemsList,invoiceTotal,subTotal,couponDetail }) {
  const [update, setUpdate] = useState([]);
  const dispatch = useDispatch();

  const handleCart = (service, category, action) => {
    dispatch(action({ service, category }));
  };

  return (
    <>
      {Object.keys(cartItemsList).map((key, index) => (
        <CartContainer sx={{ mt: 0, mb: 3 }} key={index}>
          <GItem>
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
                      width: "15rem",
                      alignItems: "start",
                      flexDirection: "column",
                      justifyContent: "start",
                    }}>
                    <Box sx={{ display: "flex", fontSize: 12 }}>
                      {row.title}
                    </Box>
                    <Box sx={{ display: "flex", fontSize: 12 }}>
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
                    </Box>
                  </GItem>
                  <GItem sx={{ minHeight: "1rem" }}>
                    <GItem sx={{ minHeight: "1rem" }}>
                      <KeyCurrency
                        value={ccyFormat(row.amount)}
                        sx={{ fontWeight: 2 }}
                      />
                    </GItem>
                  </GItem>
                </Grid>
              ))}
            </Grid>
          </GItem>
        </CartContainer>
      ))}
      <CartContainer sx={{ mt: 3, mb: 3 }}>
        <GItem>
          <CouponBox props={{ fullWidth: true }} couponDetail={couponDetail} sub_total={subTotal} />
        </GItem>
      </CartContainer>
      <CartContainer sx={{ mt: 3, mb: 3 }}>
        <GItem>
      
          <TotalAmount couponDetail={couponDetail} invoiceTotal={invoiceTotal} />
     
        </GItem>
      </CartContainer>
    </>
  );
}
