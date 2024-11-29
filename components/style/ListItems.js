import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const ListItems = ({ title, list, secondary }) => (
  <Typography
    sx={{ ml: title ? 3 : 0 }}
    component="div"
    variant={title ? "h5" : "h6"}>
    {title && title}
    <List>
      {list.map((value, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <ArrowCircleRightIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={value}
            secondary={secondary ? secondary : ""}
          />
        </ListItem>
      ))}
    </List>
  </Typography>
);
export default ListItems;
