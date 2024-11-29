import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Title from "components/style/Title";
import ShadowTitle from "components/style/ShadowTitle";

export default function Process() {
  return (
    <Box>
      <ShadowTitle title="Our Process" />
      <Title title="Our Process" />
      <Box>
        <Box className="columnDirection" sx={{ pb: 4 }}>
          <Typography className="ribbon active" underline="none">
            Book Service
          </Typography>
          <Typography className="ribbon" underline="none">
            Talk to Expert
          </Typography>
          <Typography className="ribbon" underline="none">
            Vender at Doorstep
          </Typography>

          <Typography className="ribbon" underline="none">
            {" "}
             Service Delivered
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
