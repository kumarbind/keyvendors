import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionContent({
  id,
  title,
  children,
  noBorder,
  ...otherProp
}) {
  let defaultProp = {
    defaultExpanded: true,
    ...otherProp,
  };
  let iconRotate=defaultProp.defaultExpanded?360:180;

  return (
    <>
      <Accordion {...defaultProp}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          sx={{
            ...(noBorder && {pl:0}),
            borderBottom: noBorder ? "" : "1px solid hsla(0,0%,59.2%,.2)",
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: `rotate(${iconRotate}deg)`,
            },
          }}
          aria-controls={`${id}-content`}
          id={`${id}-header`}>
          <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </>
  );
}
