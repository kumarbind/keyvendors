import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ContactsIcon from "@mui/icons-material/Contacts";
import { Box } from "@mui/material";
import TabPanel from "components/style/TabPanel";
import Profile from "./profile";
import { a11yPropsTab } from "utils/utility";
import { useIsLarge, useUrlHash } from "utils/hooks";
import { useSelector } from "react-redux";
import { getAuthPartnerToken } from "../../store/authPartnerSlice";
import { useRouter } from "next/router";
import { Verification } from "./Verification";
import { Lead } from "./Lead";
import { UpcomingLeads } from "./UpcomingLeads";

import RechargeHistory from "./RechargeHistory";
import Wallet from "./Wallet";

export default function PartnerDetails() {
  const [value, setValue] = useState(-1);
  const authToken = useSelector(getAuthPartnerToken);
  const isLarge = useIsLarge();
  const hashUrl = useUrlHash("");
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabLinks = [
    {
      icon: <ContactsIcon />,
      href: "partner",
      label: "Profile",
      panel: <Profile />,
    },
    {
      icon: <ContactsIcon />,
      href: "#verification",
      label: "Verification",
      panel: <Verification />,
    },
    {
      icon: <ContactsIcon />,
      href: "#wallet",
      label: "Wallet",
      panel: <Wallet />,
    },
    {
      icon: <ContactsIcon />,
      href: "#lead",
      label: "My Lead",
      panel: <Lead />,
    },
    {
      icon: <ContactsIcon />,
      href: "#upcoming-lead",
      label: "Upcoming Lead",
      panel: <UpcomingLeads />,
    },
    {
      icon: <ContactsIcon />,
      href: "#recharge-history",
      label: "Recharge History",
      panel: <RechargeHistory />,
    },
    { icon: <ContactsIcon />, href: "contact-us", label: "Contact Us" },
    { icon: <ContactsIcon />, href: "partner/logout", label: "Logout" },
  ];

  useEffect(() => {
   
    if (!authToken) {
      router.push("partner/login");
    }
  }, [authToken]);

  useEffect(() => {
    const tabIndex = tabLinks.findIndex((value) => `#${hashUrl}` == value.href);
    if (hashUrl) {
      setValue(tabIndex);
    } else if (tabIndex === -1) {
      setValue(0);
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
                width: "20rem",
                "& .MuiTabs-flexContainer": {
                  flexWrap: "wrap",
                },
              }}>
              {tabLinks.map((value, index) => (
                <Tab
                  key={index}
                  icon={value.icon}
                  iconPosition="start"
                  href={value.href}
                  label={value.label}
                  sx={{ justifyContent: "start" }}
                  {...a11yPropsTab("userinfo", 1)}
                />
              ))}
            </Tabs>
          )}
          {tabLinks.map(
            (tabValue, index) =>
              tabValue.panel && (
                <TabPanel key={index} value={value} index={index}>
                  {tabValue.panel}
                </TabPanel>
              )
          )}
        </Box>
      )}
    </Box>
  );
}
