import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageWithFallback from "components/style/ImageWithFallback";
import KeyCurrency from "components/style/KeyCurrency";
import { ccyFormat } from "utils/utility";
import Stack from "@mui/material/Stack";
import ScheduleIcon from "@mui/icons-material/Schedule";
import moment from "moment";
import CartContainer from "components/cart/CartContainer";

const GItem = ({ value, sx, children }) => {
  let defaultSx = {
    py: ".5rem",
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",

    ...sx,
  };
  return <Box sx={defaultSx}>{children ? children : value}</Box>;
};

export default function ItemsMobile({ orders }) {
  return (
    <>
      {orders.map((order, index) => (
        <CartContainer
          sx={{ width: "100%", minHeight: 15, p: 1, mt: 0, mb: 3, mx: 0 }}
          key={index}>
          <Grid spacing={2} direction="column" container>
            <Grid xs={12} md={12} lg={12} item>
              <Typography component={"div"} sx={{ display: "flex", ml: 2 }}>
                <ImageWithFallback
                  alt={order.category.title}
                  src={order.category.image}
                  width={100}
                  height={40}
                />
                <Typography component={"div"} sx={{ p: 1, fontSize: 12 }}>
                  {order.category.title}
                </Typography>
              </Typography>
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Stack direction="row" gap={1}>
                <ScheduleIcon fontSize="medium" />
                <Typography sx={{ fontSize: 13 }}>
                  {moment(order.date_of_service).format(`ddd MMM YYYY `)}
                  {order.slot_of_service} {order.time_of_service}
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Grid direction="column" justifyContent="start" container>
                {order.order_item.map((row, index) => (
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      borderBottom:
                        order.order_item.length - index - 1
                          ? "1px dotted green"
                          : "",
                    }}
                    key={index}
                    xs={12}>
                    <GItem
                      sx={{
                        minHeight: "1rem",
                        alignItems: "start",
                        flexDirection: "column",
                        justifyContent: "start",
                      }}>
                      <Box sx={{ display: "flex", fontSize: 12 }}>
                        <Typography component="div" sx={{ fontSize: 12 }}>
                          {index + 1}. {row.title}
                          <Typography sx={{ fontSize: 10 }}>
                            ({row.quantity} Qty)
                          </Typography>
                        </Typography>
                      </Box>
                    </GItem>
                    <GItem sx={{ minHeight: "1rem" }}>
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
            </Grid>
          </Grid>
        </CartContainer>
      ))}
    </>
  );
}
