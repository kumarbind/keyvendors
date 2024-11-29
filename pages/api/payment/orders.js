import { postData } from "services/api";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const reqData = req.body;

  let coupon_applied_id = "";
  let coupon_applied_discount = "";
  if (reqData["cart"]["coupon"]) {
    coupon_applied_id = reqData["cart"]["coupon"]["cid"];
    coupon_applied_discount = reqData["cart"]["coupon"]["discount"];
  }

  (async () => {
    try {
      let orderDetail = {
        ...reqData,
        name_title: "",
        reviewUrl: "",
        transaction_id: "",
        min_amount_for_user: 0,
        coupon_applied_id: coupon_applied_id,
        coupon_applied_discount: coupon_applied_discount,
      };

      let orderRes = null;
      try {
        orderRes = await postData(
          "order/place",
          orderDetail,
          req.headers.authorization
        );

        if (orderRes["status"] === 1) {
          let hash = "";
          if (reqData["paymentMethod"] === "online") {
            let amount = reqData["cart"]["subtotal"];
            let email = orderRes["user"]["info"]["email"]
              ? orderRes["user"]["info"]["email"]
              : "info@keyvendors.com";
            let str =
              process.env.PAY_KEY +
              "|" +
              orderRes["transaction_id"] +
              "|" +
              amount +
              "|" +
              "Keyvendors Services" +
              "|" +
              orderRes["user"]["info"]["name"] +
              "|" +
              email +
              "|" +
              "||||||||||" +
              process.env.PAY_SECRET;
            hash = require("crypto")
              .createHash("sha512")
              .update(str)
              .digest("hex");
          }
          res.json({ orderRes: orderRes, hash: hash });
        } else {
          res.status(500).send(orderRes);
        }
      } catch (error) {
        res.status(500).send(error);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  })();
}
