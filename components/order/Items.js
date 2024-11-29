import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import KeyCurrency from "components/style/KeyCurrency";
import ImageWithFallback from "components/style/ImageWithFallback";
import ScheduleIcon from "@mui/icons-material/Schedule";
import moment from "moment";
import { ccyFormat } from "utils/utility";
import { useIsLarge } from "utils/hooks";

const GItem = ({ value, sx, children, isBox, attr }) => {
  let defaultSx = {
    minHeight: "7rem",
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
    px: 8,
    ...sx,
  };
  return (
    <>
      {isBox ? (
        <Box sx={defaultSx}>{children ? children : value}</Box>
      ) : (
        <Grid item sx={defaultSx} {...attr}>
          {children ? children : value}
        </Grid>
      )}
    </>
  );
};

export default function Items({ orders }) {
  const isLarge = useIsLarge();

  let grandTotal = orders.reduce((total, order) => {
    return total + order.grand_total;
  }, 0);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid
          item
          sx={{
            display: "flex",
            width: "100%",
            borderBottom: ".03rem solid hsla(0,0%,59.2%,.2)",
            justifyContent: "center",
          }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            <GItem value="Product Name" sx={{ fontWeight: 600 }} />
            <GItem value="Plan / Service Type" sx={{ fontWeight: 600 }} />
            <GItem value="Total Amount" sx={{ fontWeight: 600 }} />
          </Grid>
        </Grid>
        {orders.map((order, index) => (
          <Grid
            item
            key={index}
            sx={{
              display: "flex",
              width: "100%",
              borderBottom: ".03rem solid hsla(0,0%,59.2%,.2)",
              justifyContent: "center",
            }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}>
              {/*** item1 */}
              <GItem sx={{ px: 0, ml: 2 }} attr={{ xs: 4 }}>
                <Grid container direction="column">
                  <Grid
                    sx={{
                      display: "flex",
                    }}
                    item>
                      <ImageWithFallback
                        alt={order.category.title}
                        src={order.category.image}
                        width={100}
                        height={40}
                      />
                    <Typography sx={{ ml: 2, fontSize: 12 }}>
                      {order.category.title}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      mt: 2,
                    }}
                    item>
                    <Stack direction="row" gap={1}>
                      <ScheduleIcon fontSize="medium" />
                      <Typography sx={{ fontSize: 13 }}>
                        {moment(order.date_of_service).format(`ddd MMM YYYY `)}
                        {order.slot_of_service} {order.time_of_service}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </GItem>
              {/*** item2 */}
              <GItem sx={{ px: 0, width: "35rem" }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="end"
                  sx={{
                    width: "100%",
                  }}>
                  {order.order_item.map((row, index) => (
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        width: "100%",
                        borderBottom: "1px dotted red",
                      }}
                      key={index}>
                      <GItem
                        sx={{
                          px: 0,
                          width: "50rem",
                          minHeight: "1rem",
                          alignItems: "flex-start",
                        }}
                        isBox={true}>
                        <Typography component="div" sx={{ fontSize: 12 }}>
                          {index + 1}. {row.title}
                          <Typography sx={{ fontSize: 10 }}>
                            ({row.quantity} Qty)
                          </Typography>
                        </Typography>
                      </GItem>
                      <GItem
                        sx={{
                          px: 0,
                          width: "70rem",
                          minHeight: "1rem",
                        }}
                        isBox={true}>
                        <Typography component="div" sx={{ fontSize: 12 }}>
                          ({row.quantity}x{row.cost}=){" "}
                          <KeyCurrency
                            value={ccyFormat(row.quantity * row.cost)}
                            sx={{ fontWeight: 2 }}
                          />
                        </Typography>
                      </GItem>
                    </Grid>
                  ))}
                </Grid>
              </GItem>
            </Grid>
          </Grid>
        ))}
        <Grid
          item
          justifyContent="end"
          sx={{
            display: "flex",
            width: "100%",
          }}>
          <Box>
            <GItem
              sx={{
                fontWeight: 500,
                alignItems: "flex-start",
                borderBottom: "none",
                fontSize: "1rem",
                px: 0,
                pt: 1,
                pr: 6,
              }}>
              <Typography component="div">
                Grand Total:
                <Typography
                  component="span"
                  sx={{
                    fontSize: ".8rem",
                    marginRight: "1rem",
                    marginTop: ".2rem",
                  }}>
                  (Inc. taxes)
                </Typography>
              </Typography>
              <Typography component="div">
                <KeyCurrency sx={{ fontSize: "inherit" }} value={grandTotal} />
              </Typography>
            </GItem>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
