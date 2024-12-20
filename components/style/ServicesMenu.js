import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import React, { memo } from "react";
import { useLocation } from "utils/hooks";
import { getServiceUrl } from "utils/utility";

export default memo(function ServicesMenu({ items ,sx }) {
  const location =useLocation();
  return (
    <Grid
      sx={{ m: 2, maxHeight: "20rem", width: "100%",...sx }}
      justifyContent="start"
      direction={"row"}
      alignItems="start"
      alignContent={"start"}
      flexWrap
      container>
      {items &&
        items.map(
          (item, index) =>
            item.children.length > 0 && (
              <Grid lg={4} md={4} xs={6} key={index} order={item.children.length} item>
                <Box
                  sx={{
                    mb: 0.5,
                    fontSize: 14,
                    textTransform: "capitalize",
                  }}>
                  <Link
                    {...(item.isClick
                      ? { onClick: item.method }
                      : { href: `/service/${location.slug}/${item.slug}` })}
                    underline="none">
                    {item.title}
                  </Link>
                </Box>
                {item.children.map((child, ind) => (
                  <Box
                    key={ind}
                    sx={{ fontSize: 12, textTransform: "capitalize" }}>
                    <Link
                      href={getServiceUrl(location,`${item.slug}/${child.slug}`)}
                      underline="none"
                      color="#000000">
                      {child.title}
                    </Link>
                  </Box>
                ))}
              </Grid>
            )
        )}
    </Grid>
  );
});
