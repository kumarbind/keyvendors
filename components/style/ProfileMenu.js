import React from "react";
import {
  Menu,
  MenuItem as MuiMenuItem,
  Avatar,
  Divider,
  Typography,
  Button,
  Fade,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ClickAwayListener from '@mui/material/ClickAwayListener';
/********************  Styled Components  ********************/
const UserAvatarButton = styled("div")(({ active, theme }) => ({
  height: 72,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0px 20px",
  cursor: "pointer",
  borderBottom: active ? `3px solid ${theme.palette.primary.main}` : "none",
  borderRadius: 0,
}));

const ProfileMenuNavigation = styled(Menu)(() => ({
  "& .MuiList-root": {
    paddingTop: 0,
    paddingBottom: 0,
    minWidth: 220,
    maxWidth: 350,
  },
}));

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  padding: 5,
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.background.main,
    boxShadow: "5px 0px 5px 0px #888888",
    transition: "box-shadow 0.3s ease-in-out",
  },
}));

const ProfileMenuText = styled(Typography)(() => ({
  fontFamily: "Poppins",
  fontSize: 14,
  fontWeight: 300,
}));

/********************  Main Component  ********************/
const ProfileMenu = ({ menus, active, isLogin }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goPath = (path) => {
    setAnchorEl(null);
  };

  const leaveMenu = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 0);
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseOver"
      touchEvent="onTouchStart"
      onClickAway={leaveMenu}
   
    >
    <div onMouseLeave={leaveMenu} >
      {isLogin ? (
        <UserAvatarButton
          id="account-button"
          active={active}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          onMouseOver={(event) => setAnchorEl(event.currentTarget)}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
            }}
            alt="Avatar"
            src="https://i.pravatar.cc/300"
          />
        </UserAvatarButton>
      ) : ( <Link href="/" underline="none" color="inherit">
        <Fab
          size="small"
          variant="extended"
          key={"signin"}
          id="account-button"

          aria-haspopup="true"
          onMouseLeave={leaveMenu}
          onClick={handleClick}
          onMouseOver={(event) => setAnchorEl(event.currentTarget)}
          sx={{ ml: 2, textTransform: "none"}}>
          <AccountCircleIcon sx={{ ml: 2 }} />
          <Box sx={{ ml: 1, mr: 2 }}>Sign in</Box>
        </Fab></Link>
      )}

      <ProfileMenuNavigation
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 65, left: 1100 }}
        disableScrollLock={true}
        MenuListProps={{
          "aria-labelledby": "account-button",
          onMouseLeave: leaveMenu,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={Fade}>
        {menus.map((menu, index) => (
          <div key={index}>
            <MenuItem onClick={() => goPath(menu.path)}>
              {menu?.icon}
              <ProfileMenuText>{menu.text}</ProfileMenuText>
            </MenuItem>
            <Divider style={{ margin: 0 }} />
          </div>
        ))}
      </ProfileMenuNavigation>
    </div>
    </ClickAwayListener>
  );
};

export default ProfileMenu;
