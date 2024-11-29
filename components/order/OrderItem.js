// @flow
import React, { useEffect, useState } from "react";
import { fetchData } from "services/api";
import Items from "./Items";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CancelRequest } from "./CancelRequest";
import { RescheduleRequest } from "./RescheduleRequest";
import { getStatusColor } from "utils/utility";
import ItemsMobile from "./ItemsMobile";
import moment from "moment";
import { useIsLarge } from "utils/hooks";

export const OrderItem = ({ order, callBack }) => {
  const [statusId, setStatusId] = useState(0);
  const [orderStatusName, setOrderStatusName] = useState("Pending");
  const enableIfNot = new Set([3, 4]);
  const isLarge = useIsLarge();

  useEffect(() => {
    if (order.order_status && order.order_status.length > 0) {
      setStatusId(order.order_status[0].os_id);
      setOrderStatusName(order.order_status[0].name);
    } else {
      if (order.order_status_changes && order.order_status_changes.length > 0) {
        setStatusId(order.order_status_changes[0].os_id);
        setOrderStatusName(order.order_status_changes[0].order_status.name);
      }
    }
  }, [order]);

  const fetchOrder = () => {
    if(callBack){
      callBack();
    }
  };
  const paymentStatus={"done":"success","pending":"warning","failed":"error"}
  return (
    <>
      {order ? (
        <Grid spacing={1} display="flex" justifyContent="start" container>
          <Grid display={"flex"} lg={6} md={6} xs={6} item>
            <Button
              variant="contained"
              color={getStatusColor(statusId)}
              sx={{
                textTransform: "capitalize",
                color: "#FFFFFF",
                cursor: "none",
              }}
              size="small">
              {orderStatusName}
            </Button>
          </Grid>
          <Grid display={"flex"} justifyContent="end" md={6} xs={6} lg={6} item>
            <Button
              size="small"
              variant="contained"
              color={paymentStatus[order.payment_status]}
              sx={{
                textTransform: "capitalize",
                cursor: "none",
                color: "#000",
              }}>
              Payment Status:{order.payment_method}({order.payment_status})
            </Button>
          </Grid>
          <Grid
            display="flex"
            justifyContent="center"
            lg={12}
            md={12}
            xs={12}
            item>
            {isLarge ? (
              <Items orders={[order]} />
            ) : (
              <ItemsMobile orders={[order]} />
            )}
          </Grid>
          {!enableIfNot.has(statusId) && (
            <Grid
              display="flex"
              justifyContent="end"
              lg={12}
              md={12}
              xs={12}
              item>
              <RescheduleRequest
                orderId={order.oid}
                selectedService={order.cid}
                handelRefresh={() => fetchOrder()}
                currentSlot={{
                  [order.cid]: {
                    cid: order.cid,
                    date: moment(order.date_of_service).format(`YYYY-MM-DD`),
                    slot: order.slot_of_service,
                    time: order.time_of_service,
                  },
                }}
              />
              <CancelRequest
                orderId={order.oid}
                handelRefresh={() => fetchOrder()}
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <>LoadConfig...</>
      )}
    </>
  );
};
