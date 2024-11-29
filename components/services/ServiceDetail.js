import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { selectCartState, cartGrandTotal } from "../../store/cartSlice";
import { useSelector } from "react-redux";
import { Details } from "./Details";
import { useIsMobile } from "utils/hooks";
import ContentBox from "components/style/ContentBox";

function ServiceDetail({ service, selectedService, refProp, showContent,disableTab }) {
  const cartState = useSelector(selectCartState);
  const invoiceTotal = useSelector(cartGrandTotal);
  const selectedSrv = selectedService
    ? selectedService
    : service.children.length
    ? service.children[0].slug
    : 0;
  const [value, setValue] = React.useState(selectedSrv);

  const isMobile = useIsMobile();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const beforePrp = {
    content: '""',
    width: "100%",
    display: "block",
    height: "25rem",
    background: "#ffebee",
    backgroundSize: "cover",
  };
  return (
    <>
      <Box
        ref={refProp}
        component={"section"}
        sx={{
          "&::before": { lg: beforePrp, md: beforePrp },
        }}>
        {isMobile ? (
          <Details
            service={service}
            value={value}
            handleChange={handleChange}
            invoiceTotal={invoiceTotal}
            cartState={cartState}
            disableTab={disableTab}
          />
        ) : (
          <>
            <Paper
              sx={{
                position: "relative",
                mx: "1.5rem",
                mt: "-20rem",
                p: 2,
              }}
              elevation={1}>
              <Details
                service={service}
                value={value}
                handleChange={handleChange}
                invoiceTotal={invoiceTotal}
                cartState={cartState}
                disableTab={disableTab}
              />
            </Paper>
          </>
        )}
      </Box>
      {showContent && (
        <>
          {service.advantage_message && (
            <ContentBox
              sx={{ mt: 5, p: 3, bgcolor: "#F8F8F2" }}
              title="Advantage of this service">
              <Box
                dangerouslySetInnerHTML={{
                  __html: service.advantage_message,
                }}
              />
            </ContentBox>
          )}
          {service.about && (
            <ContentBox sx={{ mt: 5 }} title="About The Service">
              <Box
                dangerouslySetInnerHTML={{
                  __html: service.about,
                }}
              />
            </ContentBox>
          )}
        </>
      )}
    </>
  );
}

export default ServiceDetail;
