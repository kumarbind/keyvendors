import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ConstructionIcon from "@mui/icons-material/Construction";
import ContactsIcon from "@mui/icons-material/Contacts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Box } from "@mui/material";
import TabPanel from "components/style/TabPanel";
import LinkTab from "components/style/LinkTab";
import Profile from "./profile";
import Request from "./request";
import { a11yPropsTab } from "utils/utility";
import { useIsLarge, useUrlHash } from "utils/hooks";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../store/authSlice";
import { useRouter } from "next/router";

export default function UserDetails() {
  const [value, setValue] = useState(-1);
  const authToken = useSelector(getAuthToken);
  const isLarge = useIsLarge();
  const hashUrl = useUrlHash("");
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!authToken) {
      router.push("login");
    }
  }, [authToken]);

  useEffect(() => {
    if (hashUrl !== undefined) {
      setValue(hashUrl === "request" ? 0 : 2);
    } else {
      if (value === -1) {
        setValue(2);
      }
    }
  }, [hashUrl]);

  return (
    <Box component={"section"}>
      {authToken && (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            minHeight: "30rem",
          }}>
          {isLarge && (
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              allowScrollButtonsMobile
              onChange={handleChange}
              aria-label="UserInfo tabs"
              TabIndicatorProps={{ sx: { display: "none" } }}
              sx={{
                borderRight: 1,
                borderColor: "divider",
                backgroundColor: "#00AAA1",
                width: "15rem",
                pt: 6,
                "& .MuiTabs-flexContainer": {
                  flexWrap: "wrap",
                },
              }}>
              <Tab
                icon={<ConstructionIcon />}
                iconPosition="start"
                label="Requests"
                sx={{ justifyContent: "start" }}
                {...a11yPropsTab("userinfo", 0)}
              />
              <LinkTab
                icon={<ContactsIcon />}
                iconPosition="start"
                href="contact-us"
                label="Contact Us"
                sx={{ justifyContent: "start" }}
                {...a11yPropsTab("userinfo", 1)}
              />
              <Tab
                icon={<AccountBoxIcon />}
                iconPosition="start"
                label="Profile"
                sx={{ justifyContent: "start" }}
                {...a11yPropsTab("userinfo", 2)}
              />
            </Tabs>
          )}
          <TabPanel value={value} index={0}>
            <Request />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Profile />
          </TabPanel>
        </Box>
      )}
    </Box>
  );
}
