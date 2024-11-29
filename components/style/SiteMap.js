// @flow
import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";

export default function SiteMap({ locationPages, staticPages }) {
  const getPagesGroupByCity = React.useMemo(() => {
    const groupByPages = locationPages.reduce((group, page) => {
      const { city } = page;
      group[city] = group[city] ?? [];
      group[city].push(page);
      return group;
    }, {});
    return groupByPages;
  }, [locationPages]);
 
  const getPagesGroupByCityLength = React.useMemo(() => {
    return Object.keys(getPagesGroupByCity).length;
  }, [getPagesGroupByCity]);

  const otherPages = [
    { title: "Blog", slug: "https://keyvendors.com/blogs" },
    {
      title: "Register as a Professional",
      slug: `${process.env.CDN_URL}/partner`,
    },
    { title: "Contact US", slug: "/contact-us" },
    ...staticPages
  ];

  return (
    <Box sx={{ m: 4 }}>
      <Grid container>
        <Grid lg={12} item>
          <Grid spacing={2} container>
            {otherPages.map((page, index) => (
              <Grid key={index} item>
                <Typography component={"a"} href={page.slug}>
                  <Typography
                    sx={{ fontSize: 14, textTransform: "capitalize" }}>
                    {page.title}
                  </Typography>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {Object.keys(getPagesGroupByCity).map((city, index) => (
          <Grid key={index} lg={12 / getPagesGroupByCityLength} item>
            <Grid container>
              <Grid lg={12} item>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 10, textTransform: "capitalize" }}>
                  {city}
                </Typography>
              </Grid>
              <Grid lg={12} sx={{ ml: 4 }} item>
                <Grid spacing={1} container>
                  {getPagesGroupByCity[city].map((page, index) => (
                    <Grid key={index} lg={12} item>
                      <Typography component={"a"} href={page.slug_url}>
                        <Typography
                          sx={{ fontSize: 10, textTransform: "capitalize" }}>
                          {page.page_title} {page.city} {page.area}{" "}
                        </Typography>
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
