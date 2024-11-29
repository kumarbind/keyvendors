import { useEffect, useState } from "react";
import { fetchData, postData } from "services/api";
import { useSelector } from "react-redux";
import { getAuthPartnerToken } from "../../store/authPartnerSlice";
import { Box, Stack, Grid, Paper, styled, Chip, Button } from "@mui/material";
import { toastMessage } from "utils/utility";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function UpcomingLeads() {
  const [leads, setLeads] = useState([]);
  const authToken = useSelector(getAuthPartnerToken);

  const when = (date_of_service, slot_of_service, t, order_status) => {
    let when_class = [];
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
      when_class.push("this_week");
    }

    let datediff = date - current;
    let difference = Math.floor(datediff / (1000 * 60 * 60 * 24));

    if (
      order_status === "Customer Re-Scheduled" ||
      order_status === "Customer Unreachable"
    ) {
      when = date_display;
      when_class.push("pending");
    } else if (
      order_status === "Cancelled" ||
      order_status === "Customer Cancelled" ||
      order_status === "Failed" ||
      order_status === "Refunded"
    ) {
      when = date_display;
      when_class.push("cancelled");
    } else if (order_status === "Completed") {
      when = date_display;
      when_class.push("completed");
    } else if (difference === 0) {
      when = "Today";
      when_class.push("today");
    } else if (difference > 1) {
      when = "Future Date";
      when_class.push("");
    } else if (difference > 0) {
      when = "Tomorrow";
      when_class.push("tomorrow");
    } else if (difference < -1) {
      when = date_display;
      when_class.push("pending");
    } else {
      when = "Yesterday";
      when_class.push("pending");
    }

    return (when = when + " " + slot_of_service + " " + t);
  };

  const fetchDetails = async (id) => {
    let options = {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    };
    let param = {};
    if (id) {
      param = {
        areaId: id,
      };
    }
    let res = await fetchData(`partner/upcoming_leads`, param, options);

    setLeads(res);
  };
  const orderAssign = async (ord) => {
    try {
      let res = await postData(
        "partner/order_assign",
        {
          cid: ord.cid,
          oid: ord.oid,
        },
        authToken
      );

      toastMessage("success", res.message);
      await fetchDetails(null);
    } catch (error) {
      toastMessage("error", error.response.data.error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchDetails(null);
    })();
  }, []);

  return (
    <Box sx={{ mt: 5, mx: 2 }}>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                {leads.areas &&
                  leads.areas.map(($area, $index) => (
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                      key={$index}
                      item>
                      <Chip
                        onClick={async () => await fetchDetails($area.id)}
                        data-toggle="tooltip"
                        data-placement="top"
                        title={$area.area_name}
                        data-filter="all"
                        label={
                          $area.area_name.length > 20
                            ? $area.area_name.substring(0, 20) + "..."
                            : $area.area_name
                        }></Chip>
                    </Stack>
                  ))}
              </Stack>
            </Item>
          </Grid>
          {leads.orders &&
            leads.orders.map((lead, index) => (
              <Grid key={index} item xs={12}>
                <Item>
                  <Grid container spacing={2}>
                    <Grid md={4} xs={12} item>
                      <Box sx={{ typography: "subtitle1" }}>
                        {lead.oid}/
                        {`${lead.name_title ? lead.name_title : ""} ${
                          lead.name
                        }`}
                        <Box>{lead.flat_building}</Box>
                      </Box>
                    </Grid>
                    <Grid md={4} xs={12} item>
                      <Box sx={{ typography: "body1" }}>
                        {when(
                          lead.date_of_service,
                          lead.slot_of_service,
                          lead.time_of_service
                        )}
                      </Box>
                      <Box sx={{ typography: "body1" }}>
                        Rs. {lead.grand_total}
                      </Box>
                    </Grid>
                    <Grid md={4} xs={12} item>
                      <Button
                        variant="contained"
                        onClick={() => orderAssign(lead)}>
                        Accept
                      </Button>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
