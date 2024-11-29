import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { popoverClasses } from "@mui/material/Popover";
import Grow from "@mui/material/Grow";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
function Submenu({ buttonValue, id, items, buttonLink ,buttonProp}) {
  let currentlyHovering = false;
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleHover() {
    currentlyHovering = true;
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 50);
  }


  return (
    <Box>
      <Button
       {...buttonProp}
        aria-owns={anchorEl ? `sub-menu${id}` : undefined}
        aria-haspopup="true"
        href={buttonLink}
        onMouseOver={handleClick}
        onMouseLeave={handleCloseHover}>
        {buttonValue}
      </Button>
      {items.length > 0 && (
        <Menu
          id={`sub-menu${id}`}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          //anchorReference="anchorPosition"
          // anchorPosition={{ top: 65, left: 900 }}
          disableScrollLock={true}
          TransitionProps={Grow}
          MenuListProps={{
            onMouseEnter: handleHover,
            onMouseLeave: handleCloseHover,
            style: { pointerEvents: "auto" },
          }}
          getContentAnchorEl={null}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          sx={{
            [`&.${popoverClasses.root}`]: {
              pointerEvents: "none",
            },
            [`& .${popoverClasses.paper}`]: {
              color: "#FF5733",
            },
          }}>
          {items.map((item, index) => (
            <MenuItem
              key={index}
              onClick={handleClose}
              sx={{ fontSize: 13, fontWeight: 600 }}>
              {item.isClick ? (
                <Link onClick={item.method} underline="none" color="inherit">
                  {item.title}
                </Link>
              ) : (
                <Link href={item.path} underline="none" color="inherit">
                  {item.title}
                </Link>
              )}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  );
}

export default Submenu;
