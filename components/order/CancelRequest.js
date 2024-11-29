// @flow
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import DialogBox from "components/style/DialogBox";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { postData } from "services/api";
import { toastMessage } from "utils/utility";

export function CancelRequest({ orderId,handelRefresh }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (orderId) => {
    try {
      let res = await postData("user/order/status/cancel", {
        oid: orderId,
        cancel_reason: reason,
      });

      if(handelRefresh){
        await handelRefresh();
      }

      handleClose();
      toastMessage("success",res.message);
    } catch (error) {
      console.error(error);
      toastMessage("error","Somethings went wrong.");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" color="error">
        Cancel
      </Button>
    
      <DialogBox
        title="Cancel Request"
        open={open}
        disableAction={reason.length>10?false:true}
        handleSubmit={() => handleSubmit(orderId)}
        handleClose={() => handleClose()}>
        <Box>
          <TextareaAutosize
            onChange={(e) => setReason(e.target.value)}
            aria-label="cancel reason"
            minRows={10}
            placeholder="Please Mention your Reason.(At least 10 characters)"
            style={{ width: 300 }}
          />
        </Box>
      </DialogBox>
    </>
  );
}
