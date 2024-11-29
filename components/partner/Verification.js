// @flow
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import DialogBox from "components/style/DialogBox";
import { postData } from "services/api";
import { toastMessage } from "utils/utility";
import CartPersonalDetail from "components/cart/CartPersonalDetail";

export function Verification({ handelRefresh,actionTitle }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values) => {
    try {
      let res = await postData("user/update/address", values);
      await handelRefresh();
      handleClose();
      toastMessage("success", res.message);
    } catch (error) {
      console.error(error);
      toastMessage("error", "Somethings went wrong.");
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>{actionTitle}</Button>
      <DialogBox
        title={`${actionTitle} Address`}
        open={open}
        disableAction={reason.length > 10 ? false : true}
        handleClose={() => handleClose()}>
        <Box>
          <CartPersonalDetail isAddressEdit={true} handleUpdate={handleSubmit} />
        </Box>
      </DialogBox>
    </>
  );
}
