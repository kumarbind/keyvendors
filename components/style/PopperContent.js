import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const cStyle = (theme, bValue) => ({
  width: "1rem",
  height: "1rem",
  "&::before": {
    borderWidth: bValue,
    borderColor: `${theme.palette.background.paper} transparent ${theme.palette.background.paper} transparent`,
  },
});

const StyledPopper = styled(Popper)(({ theme }) => ({
  // You can replace with `PopperUnstyled` for lower bundle size.
  zIndex: 1,
  maxWidth: "21rem",
  height: "auto",
  marginTop:"1rem !important",

  '&[data-popper-placement*="bottom"] .arrow': {
    top: 0,
    left: 0,
    marginTop: "-0.9em",
    ...cStyle(theme, "0 1em 1em 1em"),
  },
  '&[data-popper-placement*="top"] .arrow': {
    bottom: 2.8,
    left: 0,
    marginBottom: "-0.9em",
    ...cStyle(theme, "1em 1em 0 1em"),
  },
  '&[data-popper-placement*="right"] .arrow': {
    left: 0,
    marginLeft: "-0.9em",
    ...cStyle(theme, "1em 1em 1em 0"),
  },
  '&[data-popper-placement*="left"] .arrow': {
    right: 0,
    marginRight: "-0.9em",
    ...cStyle(theme, "1em 0 1em 1em"),
  },
}));

export default function PopperContent(pops) {
  const { open, placement, anchorEl } = pops;
  const id = open ? "locationDialog" : undefined;
  const [arrowRef, setArrowRef] = React.useState(null);
  const styles = {
    arrow: {
      position: "absolute",
      fontSize: 15,
      width: "3rem",
      height: "3rem",
      "&::before": {
        content: '""',
        margin: "auto",
        display: "block",
        width: 0,
        height: 0,
        borderStyle: "solid",
      },
    },
  };

  return (
      <StyledPopper
     
        id={id}
        keepMounted
        disablePortal={true}
        modifiers={[
          {
            name: "flip",
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
          {
            name: "arrow",
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
        ]}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        >
        <Paper>{pops.children}</Paper>
        <Box
          component="span"
          className="arrow"
          ref={setArrowRef}
          sx={styles.arrow}
        />
      </StyledPopper>
  );
}
