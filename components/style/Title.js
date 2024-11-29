import Typography from "@mui/material/Typography";

export default function Title({ title,disableEm,sx }) {
  const defaultSx={pb:4,...sx}
  return (
    <Typography sx={defaultSx}
      component="div"
      variant="h4"
      align="center"
      color="text.primary"
      className={disableEm?"":"em"}
      gutterBottom>
      {title}
    </Typography>
  );
}
