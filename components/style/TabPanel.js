import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes,{ node,string, number, oneOfType } from 'prop-types';

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{ width: "100%",  textAlign: "center" }}
      role="UserInfo"
      hidden={value !== index}
      id={`vertical-UserInfo-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <>
          {children}
        </>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: node,
  index: oneOfType([number.isRequired,string.isRequired]),
  value: oneOfType([number.isRequired,string.isRequired]),
};
