import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Footer from "components/style/Footer";
import Header from "components/style/Header";

function Layout(props) {
  const sxProp = {
    bgcolor: "background.paper",
    pt: 7,
    pb: 3,
    ...props.sx,
  };

  return (
    <>
      <Header megaMenuList={props.megaMenuList}/>
      <Box sx={{ mt:3 }} component="main">
        <Box sx={sxProp}>{props.children}</Box>
      </Box>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </>
  );
}

export default Layout;
