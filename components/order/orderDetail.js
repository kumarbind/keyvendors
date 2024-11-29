// @flow
import { useEffect, useState } from "react";
import { fetchData } from "services/api";
import { OrderItem } from "./OrderItem";
import CartAccordion from "components/style/CartAccordion";
import ImageWithFallback from "components/style/ImageWithFallback";
import { Grid, Typography, Rating, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { ReviewRequest } from "components/user/ReviewRequest";

export const OrderDetail = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [statusId, setStatusId] = useState(0);

  const fetchOrder = async (orderId) => {
    let res = await fetchData(`order_details/${orderId}`);
    setOrder(res.order);
  };

  const downloadInvoice = async (oid) => {
    let res = await fetchData(`order/download_invoice/${oid}`, null, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
    });

    const fileURL = window.URL.createObjectURL(new Blob([res]));
    let alink = document.createElement("a");
    alink.href = fileURL;
    alink.download = `Invoice_${oid}.pdf`;
    alink.click();
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  useEffect(() => {
    if (order) {
      if (order.order_status && order.order_status.length > 0) {
        setStatusId(order.order_status[0].os_id);
      } else {
        if (
          order.order_status_changes &&
          order.order_status_changes.length > 0
        ) {
          setStatusId(order.order_status_changes[0].os_id);
        }
      }
    }
  }, [order]);

  return (
    <>
      {order ? (
        <>
          {order.technician_lead && (
            <CartAccordion
              title={"Technician Details"}
              containerSx={{ mb: 3, mt: 0, mx: 0 }}>
              <Grid spacing={1} container>
                <Grid item>
                  <ImageWithFallback
                    imgSrc={order.technician_lead.technician.photo}
                    width={75}
                    height={75}
                    fallbackSrc={"/assets/images/userdefault.webp"}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontSize: 14,
                      fontWeight: 600,
                    }}>
                    {order.technician_lead.technician.name}
                    {statusId === 4 && <ReviewRequest tid={order.technician_lead.tid} />}
                  </Typography>
                  <Rating value={4} readOnly />
                </Grid>
              </Grid>
            </CartAccordion>
          )}

          <CartAccordion
            title={
              <>
                Order Details
                <Button
                  onClick={() => downloadInvoice(order.oid)}
                  sx={{ textTransform: "capitalize", color: "red" }}>
                  Invoice <DownloadIcon sx={{ color: "red" }} />
                </Button>
              </>
            }
            containerSx={{ mt: 1, mx: 0 }}>
            <OrderItem order={order} callBack={() => fetchOrder(orderId)} />
          </CartAccordion>
        </>
      ) : (
        <>LoadConfig...</>
      )}
    </>
  );
};
