import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "components/style/TabPanel";
import { fetchData } from "services/api";
import Gird from "@mui/material/Grid";
import OrderCard from "./OrderCard";
import { OrderDetail } from "components/order/orderDetail";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { a11yPropsTab } from "utils/utility";
import useSWR from "swr";

const OrderList = ({ orders, handleDetail, isLoading, error }) => {
  return (
    <Box sx={{ pt: 3 }}>
      <Gird container spacing={1}>
        {orders &&
          orders.map((order, index) => (
            <Gird key={index} xs={12} md={4} lg={4} item>
              <OrderCard order={order} handleDetail={handleDetail} />
            </Gird>
          ))}
        {isLoading && <Gird item>Loading...</Gird>}
        {error && <Gird item>Failed to load</Gird>}
      </Gird>
    </Box>
  );
};

export default function Request() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const { data, error, isLoading, mutate } = useSWR(
    `user/order/${tabValue === 1 ? "close" : "open"}`,
    fetchData
  );

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDetail = (event, orderId) => {
    setSelectedOrderId(orderId);
    handleChange(event, 2);
  };

  useEffect(() => {
    if (tabValue < 2) {
      mutate();
    }
  }, [tabValue, mutate]);

  return (
    <Box sx={{ mt: 5, mx: 2 }}>
      <Box
        sx={{
          display: "flex",
          borderBottom: 1,
          justifyContent: "start",
          borderColor: "divider",
        }}>
        {tabValue < 2 ? (
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs request">
            <Tab label="Open Request" {...a11yPropsTab("request", 0)} />
            <Tab label="Close Request" {...a11yPropsTab("request", 1)} />
          </Tabs>
        ) : (
          <Button onClick={(e) => handleChange(e, 0)}>
            <ArrowBackIosIcon />
            Back
          </Button>
        )}
      </Box>
      <TabPanel value={tabValue} index={0}>
        <OrderList
          orders={data ? data.orders : null}
          handleDetail={handleDetail}
          isLoading={isLoading}
          error={error}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <OrderList
          orders={data ? data.orders : null}
          handleDetail={handleDetail}
          isLoading={isLoading}
          error={error}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ p: { lg: 3, md: 2, xs: 1 } }}>
          <OrderDetail orderId={selectedOrderId} />
        </Box>
      </TabPanel>
    </Box>
  );
}
