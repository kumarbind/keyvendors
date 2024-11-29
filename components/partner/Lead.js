import { useEffect, useState } from "react";
import { fetchData } from "services/api";
import { useSelector } from "react-redux";
import { getAuthPartnerToken } from "../../store/authPartnerSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { a11yPropsTab } from "utils/utility";
import { Box, Button, Tabs, Tab, Grid, Paper, styled } from "@mui/material";

import { LeadDetail } from "./LeadDetail";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const tabs = [
  "All",
  "Pending",
  "Today",
  "Tomorrow",
  "This Week",
  "Cancelled",
  "Detail",
];
export function Lead() {
  const [tabValue, setTabValue] = useState(0);
  const [leads, setLeads] = useState([]);
  const [displayLeads, setDisplayLeads] = useState([]);
  const [showDetail, setShowDetail] = useState(null);
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
  const handleChange = (event, newValue) => {
    setTabValue(newValue);

    if (["Today", "Tomorrow", "This Week"].includes(tabs[newValue])) {
      setDisplayLeads(
        leads.filter((lead) => {
          console.log(
            filterWhen(
              lead.order.date_of_service,
              lead.order.order_status.name
            ),
            tabs[newValue]
          );
          return (
            filterWhen(
              lead.order.date_of_service,
              lead.order.order_status.name
            ) == tabs[newValue]
          );
        })
      );
    } else {
      setDisplayLeads(
        tabs[newValue] == "All"
          ? leads
          : leads.filter((lead) => {
              return lead.order.order_status.name == tabs[newValue];
            })
      );
    }
  };

  const handleDetail = (lead) => {
    setTabValue(6);
    setShowDetail(lead);
  };
  const handleBack = () => {
    if (tabValue == 7) {
      setTabValue(6);
    } else {
      setTabValue(0);
      setShowDetail(null);
    }
  };

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
  const handleTabValue = (tab) => {
    setTabValue(tab);
  };
  useEffect(() => {
    (async () => {
      let options = {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };
      let res = await fetchData(`partner/leads`, undefined, options);
      setLeads(res.leads);
      setDisplayLeads(res.leads);
    })();
  }, []);

  return (
    <>
      <Box sx={{ mt: 5, mx: 2 }}>
        <Box
          sx={{
            display: "flex",
            borderBottom: 1,
            justifyContent: "start",
            borderColor: "divider",
          }}
        >
          {tabValue < 6 ? (
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs request"
            >
              {tabs.map((value, key) =>
                key < 6 ? (
                  <Tab
                    key={value}
                    label={value}
                    {...a11yPropsTab("request", 0)}
                  />
                ) : (
                  ""
                )
              )}
            </Tabs>
          ) : (
            <Button onClick={handleBack}>
              <ArrowBackIosIcon />
              Back
            </Button>
          )}
        </Box>
        {tabValue > 5 ? (
          <LeadDetail
            lead={showDetail}
            tabValue={tabValue}
            handleTabValue={handleTabValue}
          />
        ) : (
          <Box sx={{ mt: 3, flexGrow: 1 }}>
            <Grid container spacing={2}>
              {displayLeads &&
                displayLeads.map((lead, index) => (
                  <Grid key={index} item xs={12}>
                    <Item>
                      <Grid container spacing={2}>
                        <Grid xs={6} item onClick={() => handleDetail(lead)}>
                          {lead.order.user && (
                            <Box sx={{ typography: "subtitle1" }}>
                              {`${
                                lead.order.user.name_title
                                  ? lead.order.user.name_title
                                  : ""
                              } ${lead.order.user.name}`}
                            </Box>
                          )}
                          {lead.order.order_status &&
                            lead.order.order_status.length > 0 && (
                              <>
                                <Box sx={{ typography: "body1" }}>
                                  {lead.order.order_status[0].os_id == 4
                                    ? "**********"
                                    : lead.order.flat_building}
                                </Box>
                                <Box
                                  sx={{
                                    typography: "body1",
                                    color:
                                      paymentStatus[
                                        lead.order.order_status[0].os_id - 1
                                      ],
                                  }}
                                >
                                  {lead.order.order_status[0].name}
                                </Box>
                              </>
                            )}
                        </Grid>

                        <Grid item>
                          <Box sx={{ typography: "body1" }}>
                            {when(
                              lead.order.date_of_service,
                              lead.order.slot_of_service,
                              lead.order.time_of_service,
                              lead.order.order_status.name
                            )}
                          </Box>
                          <Box sx={{ typography: "body1" }}>
                            Rs. {lead.order.grand_total}
                          </Box>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
}
