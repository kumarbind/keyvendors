import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

const IconContent = (props) => {
  const { content, icon, dividerText, isDividerOff, clickHandle } = props;
  const defaultSx = {
    ml: 1,
    fontSize: 12,
    ...props.sx,
  };
  return (
    <>
      <Typography
        variant="subtitle1"
        component={"div"}
        {...(clickHandle &&
          typeof clickHandle === "function" && { onClick: clickHandle })}
        sx={{
          p: 2,
          cursor: clickHandle ? "pointer" : "default",
          verticalAlign: "middle",
          display: "inline-flex",
        }}>
        {icon}
        <Box sx={defaultSx}>{content}</Box>
      </Typography>
      {!isDividerOff && (
        <Divider
          sx={{
            minWidth: "21rem",
            borderColor: dividerText ? "red" : "greenyellow",
          }}>
          {dividerText && (
            <Typography sx={{ fontSize: 11 }}>{dividerText}</Typography>
          )}
        </Divider>
      )}
    </>
  );
};
export default IconContent;
