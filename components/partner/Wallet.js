import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getStatusColor } from "utils/utility";

const CardDetail = ({ order, handleDetail }) => {
  const statusId =
  order.order_status && order.order_status.length > 0 ? order.order_status[0]["os_id"] : 0;
  return (
    <>
      <CardContent sx={{ p: 0 }}>
        <Grid sx={{ width: "100%" }} container>
          <Grid
            xs={12}
            md={12}
            lg={12}
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#00AAA1",
            }}
            item>
            <Button
              component="div"
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: "#000000",
                cursor: "none",
              }}>
              Order#{order.oid}
            </Button>
            <Button
              component="div"
              variant="contained"
              color={getStatusColor(statusId)}
              sx={{
                overFlow: "hidden",
                whiteSpace: "normal",
                minWidth: "max-content",
                height: "1.5rem",
                cursor: "none",
                fontSize: 12,
                color: "#FFFFFF",
              }}>
              {statusId ? order.order_status[0]["name"] : "Pending"}
            </Button>
          </Grid>
          <Grid xs={12} item>
            {order.category && (
              <Typography variant="h6" component="div">
                {order.category.title}
              </Typography>
            )}
            <Typography
              sx={{ mb: 1.5, fontSize: 12, fontWeight: 600 }}
              color="text.secondary">
              {moment(order.date_of_service).format("ddd MMM YYYY")}{" "}
              {order.time_of_service} ({order.slot_of_service} )
            </Typography>
            <Typography
              sx={{
                mb: 1.5,
                fontSize: 12,
                fontWeight: 600,
                textTransform: "capitalize",
              }}
              >
              Amount ({order.payment_status} ) {order.payment_method}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={(e) =>
            handleDetail(e, `${order.transaction_id}/${order.oid}`)
          }
          size="small">
          Get More Detail <ArrowForwardIosIcon />
        </Button>
      </CardActions>
    </>
  );
};

export default function Wallet({ order, handleDetail }) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <CardDetail order={order} handleDetail={handleDetail} />
      </Card>
    </Box>
  );
}
