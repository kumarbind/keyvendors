import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SearchService from "./SearchService";
import Box from "@mui/material/Box";
import { useLocation } from "utils/hooks";
import { getServiceUrl } from "utils/utility";

const NavButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  borderRadius: "30px",
  textAlign: "center",
  color: theme.palette.text.secondary,
  textTransform: "capitalize",
}));
export default function Cta({ services ,city}) {
  const location =useLocation();
  
  return (
    <Box sx={{ px: 3, py: 1, background: "#ffebee" }}>
      <Typography variant="h5" align="center" sx={{ pb: 3 }}>
        The Best Cleaning Service Ever!
      </Typography>
      <Typography
        variant="h3"
        align="center"
        color="subPrimary.main"
        sx={{ pb: 3 }}>
        We Are Certified Company
      </Typography>
      <Typography variant="h5" align="center" sx={{ pb: 3 }}>
        Book Your Home Appliances Cleaning Service
      </Typography>

      <Box align="center" sx={{ mb: 2 }}>
        <SearchService
          defaultService={services && services.length > 0 ? services : []}
        />
      </Box>
      {services && services.length > 0 && (
        <>
          <Grid justifyContent={"center"} alignItems="center" container>
            <Grid item>
              <Typography variant="span" sx={{ p: 2 }}>
                Popular:
              </Typography>
            </Grid>
            <Grid item>
            <Grid justifyContent={"center"} alignItems="center" container>
              {services.map((service, index) => (
                <Grid key={index} item><NavButton href={getServiceUrl(location,service.slug)} >
                  {service.title}
                </NavButton></Grid>
              ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
