import Typography from "@mui/material/Typography";

export default function ShadowTitle({ title,disableEm }) {
  
  return (
    <Typography
      component="div"
      align="center"
      color="text.primary"
      className={disableEm?"":"shadowText"}
      gutterBottom>
      {title}
    </Typography>
  );
}
