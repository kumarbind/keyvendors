// @flow
import * as React from "react";
import Box from "@mui/material/Box";
import Title from "components/style/Title";
import ShadowTitle from "components/style/ShadowTitle";

export default function ContentBox({ shadowTitle, title, children, sx }) {
  const defaultSx = {...sx };
  return (
    <Box sx={defaultSx}>
      {shadowTitle && <ShadowTitle title={shadowTitle} />}
      {title && <Title title={title} />}
      <>{children}</>
    </Box>
  );
}
