import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { postData } from "services/api";
import { useDispatch } from "react-redux";
import { toastMessage } from "utils/utility";
import { applyCoupon,removeCoupon } from "store/cartSlice";
export default function CartCoupon({ props, couponDetail, sub_total }) {
  const [coupon, setCoupon] = useState(couponDetail ? couponDetail.code : "");
  const dispatch = useDispatch();

  const addCoupon = async () => {
    if (coupon) {
      let api_url = couponDetail
        ? `order/coupon_remove/${couponDetail.cid}`
        : "order/coupon_apply";

      try {
        let res = await postData(api_url, {
          coupon: coupon,
          sub_total: sub_total,
        });

        if (res.status) {
          dispatch(
            couponDetail
              ? removeCoupon()
              : applyCoupon({ coupon: { code: coupon, ...res } })
          );
        }
        toastMessage(res.status?"success":"warning", res.message);
      } catch (error) {
        toastMessage("error", "Internal server error");
        console.error(error);
      }
    }
  };

  return (
    <>
      <TextField
        id="promo-code"
        placeholder="Have a promo code?"
        value={coupon}
        disabled={couponDetail ? true : false}
        onChange={(e) => setCoupon(e.target.value)}
        sx={{ backgroundColor: "#FBFBFB" }}
        InputProps={{
          endAdornment: (
            <Button
              onClick={(e) => addCoupon()}
              sx={{ textTransform: "none", fontWeight: 800 }}>
              {couponDetail ? "X" : "Apply"}
            </Button>
          ),
        }}
        {...props}
      />
    </>
  );
}
