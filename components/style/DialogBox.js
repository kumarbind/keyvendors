import  React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1, color: "red" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DialogBox(props) {
  const {
    open,
    handleClose,
    handleSubmit,
    children,
    title,
    disableAction,
    paperPropsSx,
    ...other
  } = props;

  return (
    <Box>
      <BootstrapDialog
        PaperProps={{ sx: { position: "fixed",  m: 0,...(paperPropsSx?paperPropsSx:{top: 100}) } }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        {...other}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}>
          {title &&<Box sx={{ fontSize: 18 }}>{title}</Box>}
        </BootstrapDialogTitle>
        <DialogContent {...(title && {dividers:true})}>{children}</DialogContent>
        {handleSubmit && <DialogActions>
          <Button
            autoFocus
            disabled={disableAction ? disableAction : false}
            onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>}
      </BootstrapDialog>
    </Box>
  );
}
