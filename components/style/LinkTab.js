import * as React from "react";
import Tab from '@mui/material/Tab';
export default function LinkTab(props) {
    return (
      <Tab
        component="a"       
        {...props}
      />
    );
  }