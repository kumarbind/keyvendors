import { useEffect, useState } from "react";
import { fetchData, postFormData } from "services/api";
import { useSelector } from "react-redux";
import { getAuthPartnerToken } from "../../store/authPartnerSlice";
import { Box, Button, Grid, TextareaAutosize, TextField } from "@mui/material";
import Link from "@mui/material/Link";
import { toastMessage } from "utils/utility";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { LeadPayment } from "./LeadPayment";
export function LeadDetail({ lead, tabValue, handleTabValue }) {
  const [leadDetail, setLeadDetail] = useState(null);
  const [ordStatus, setOrdStatus] = useState();
  const [displayPayment, setDisplayPayment] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState();
  const [reason, setReason] = useState("");

  const paymentStatus = [
    "red",
    "pink",
    "red",
    "green",
    "red",
    "lightGreen",
    "blue",
    "red",
    "red",
    "red",
  ];
  const authToken = useSelector(getAuthPartnerToken);
  const fetchOrder = async (tl_id) => {
    let options = {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    };
    let res = await fetchData(`partner/lead/${tl_id}`, undefined, options);
    setLeadDetail(res);
  };
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.name,
  });
  const filterWhen = (date_of_service, order_status) => {
    let when = "";
    let current = new Date();
    let date = new Date(date_of_service);
    let date_display = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let date_last_7_days = new Date();
    date_last_7_days.setDate(current.getDate() - 7);

    if (date > date_last_7_days) {
      when = "This Week";
    }

    let datediff = date - current;
    let difference = Math.floor(datediff / (1000 * 60 * 60 * 24));

    if (
      order_status === "Customer Re-Scheduled" ||
      order_status === "Customer Unreachable"
    ) {
      when = date_display;
    } else if (
      order_status === "Cancelled" ||
      order_status === "Customer Cancelled" ||
      order_status === "Failed" ||
      order_status === "Refunded"
    ) {
      when = date_display;
    } else if (order_status === "Completed") {
      when = date_display;
    } else if (difference === 0) {
      when = "Today";
    } else if (difference > 1) {
      when = "Future Date";
    } else if (difference > 0) {
      when = "Tomorrow";
    } else if (difference < -1) {
      when = date_display;
    } else {
      when = "Yesterday";
    }

    return when;
  };

  const when = (date_of_service, slot_of_service, time, order_status) => {
    return (
      filterWhen(date_of_service, order_status) +
      " " +
      slot_of_service +
      " " +
      time
    );
  };

  const handleOrderStatusChanges = async (event) => {
    console.log(event);
    const formData = new FormData();
    formData.append("oid", lead.order.oid);
    formData.append("os_id", ordStatus);
    formData.append("reschedule_date", rescheduleDate ? rescheduleDate : "");
    formData.append("cancel_reason", reason);
    formData.append("private_complaint_msg", "");

    try {
      const rs = await postFormData(
        "partner/order_status_change",
        formData,
        authToken
      );
      toastMessage("success", rs.message);
      handleTabValue(7);
    } catch (error) {
      toastMessage("error", error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("ss", lead.order.oid);
    if (lead.order) {
      fetchOrder(lead.tl_id);
    }
  }, []);

  return (
    <Box sx={{ mt: 3, flexGrow: 1 }}>
      {tabValue === 7 ? (
        <LeadPayment lead={leadDetail} />
      ) : (
        <Grid container spacing={2} justify="flex-end">
          <Grid xs={12} item>
            <Box>
              <b>Complaint No:</b>
              {`${lead.order.oid}`}
            </Box>
            <Box sx={{ typography: "subtitle1" }}>
              {lead.order.user
                ? `${
                    lead.order.user.name_title ? lead.order.user.name_title : ""
                  } ${lead.order.user.name}`
                : `${lead.order.name_title} ${lead.order.name}`}
            </Box>

            {lead.order.order_status && lead.order.order_status.length > 0 && (
              <>
                <b>Address:</b>
                <Box sx={{ typography: "body1" }}>
                  {lead.order.order_status[0].os_id == 4
                    ? "**********"
                    : lead.order.flat_building +
                      " , " +
                      lead.order.location_field}
                </Box>
                <b>Phone:</b>
                <Box sx={{ typography: "body1" }}>
                  {lead.order.order_status[0].os_id == 4 ? (
                    "**********"
                  ) : (
                    <Link href={`tell:${lead.order.phone}`}>
                      {lead.order.phone}
                    </Link>
                  )}
                </Box>
                <Box
                  sx={{
                    typography: "body1",
                    color: paymentStatus[lead.order.order_status[0].os_id - 1],
                  }}
                >
                  {lead.order.order_status[0].name}
                </Box>
              </>
            )}
          </Grid>

          <Grid xs={12} item>
            <b>Service required date:</b>
            <Box sx={{ typography: "body1" }}>
              {when(
                lead.order.date_of_service,
                lead.order.slot_of_service,
                lead.order.time_of_service,
                lead.order.order_status.name
              )}
            </Box>
            <b>You have to collect:</b>
            <Box sx={{ typography: "body1" }}>Rs. {lead.order.grand_total}</Box>
          </Grid>
          {leadDetail && (
            <>
              <Grid xs={12} item>
                <b>Service :</b>
                {leadDetail.category.title}
                {leadDetail.order_items.map((value, key) => (
                  <Grid
                    sx={{ mt: 1 }}
                    key={value}
                    container
                    spacing={1}
                    justify="flex-end"
                  >
                    <Grid xs={12} item>
                      {key + 1}. {value}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              {leadDetail.OrderCompleted && (
                <Grid xs={12} item>
                  <Box>
                    <b>Warrenty</b>
                    <Box>
                      {leadDetail.OrderCompleted.is_warrenty == 1
                        ? leadDetail.OrderCompleted.warrenty_msg
                        : "No"}
                    </Box>
                  </Box>
                </Grid>
              )}
              <Grid xs={9} item>
                <Grid container>
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      onChange={(e, value) => setOrdStatus(value.os_id)}
                      id="order_sc"
                      options={leadDetail.orderStatus}
                      getOptionLabel={(option) => option.name}
                      filterOptions={filterOptions}
                      getOptionSelected={(option, value) =>
                        option.os_id === value.os_id
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.os_id === value.os_id
                      }
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Order Status" />
                      )}
                    />
                  </Grid>
                  {ordStatus == 8 ? (
                    <TextField
                      type="datetime-local"
                      onChange={(e) => setRescheduleDate(e.target.value)}
                    />
                  ) : ordStatus == 9 ? (
                    <Grid item>
                      {" "}
                      <TextareaAutosize
                        minRows={3}
                        placeholder="Reason"
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
              <Grid xs={3} item>
                <Box>
                  <Button
                    variant="contained"
                    onClick={(e) => handleOrderStatusChanges(e)}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </Box>
  );
}
