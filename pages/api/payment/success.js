import Payu from "payu-websdk";
import { postData } from "services/api";

export default async function handler(req, res) {
  try {
    // getting the details back from our font-end
    const { transactionId } = req.body;

    const payuClient = new Payu(
      {
        key: process.env.PAY_KEY,
        salt: process.env.PAY_SECRET,
      },
      process.env.PAY_ENV
    ); // Possible value  = TEST/PROD

    const payURes = await payuClient.verifyPayment(transactionId);
    const transactionStatus = payURes.transaction_details[transactionId].status;
    const mihpayid = payURes.transaction_details[transactionId].mihpayid;
    let msg = "cash";
    if (mihpayid !== "Not Found") {
      if (transactionStatus === "success") {
        await postData("order/payment", {
          method: `online`,
          payment_id: `${transactionId}`,
          status: "done",
          transactionId: `${transactionId}`,
        });
        msg = "online success";
      } else {
        await postData("order/payment", {
          method: `online`,
          payment_id: "",
          status: "failed",
          transactionId: `${transactionId}`,
        });
        msg = "online failed";
      }
      // THE PAYMENT IS LEGIT & VERIFIED
    }
    res.status(200).json({ msg: msg });
  } catch (error) {
    console.error(error);
    console.log(error);
    await postData("order/payment", {
      method: `online`,
      payment_id: "",
      status: "failed",
      transactionId: `${transactionId}`,
    });
    res.status(500).send(error);
  }
}
