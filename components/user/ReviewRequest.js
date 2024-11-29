// @flow
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import DialogBox from "components/style/DialogBox";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { postData } from "services/api";
import { toastMessage } from "utils/utility";
import ReviewsIcon from "@mui/icons-material/Reviews";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RatingComponent from "components/style/RatingComponent";

export function ReviewRequest({ tid, handelRefresh }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [rating, setRating] = useState(0);
  const handleChange = (value) => {
    setRating(value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async () => {
    try {
      let res = await postData("user/review/technician", {
        rating: rating,
        body: reason,
        reviewed_on:"Web",
        tid: tid,
      });

      if (handelRefresh) {
        await handelRefresh();
      }

      handleClose();
      toastMessage("success", res.message);
    } catch (error) {
      console.error(error);
      toastMessage("error", "Somethings went wrong.");
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        component="div"
   >
        <Tooltip title="Rate Us">
          <ReviewsIcon />
        </Tooltip>
      </Button>
      <DialogBox
        title="Review Service"
        open={open}
        disableAction={(reason.length > 10) && rating ? false : true}
        handleSubmit={() => handleSubmit()}
        handleClose={() => handleClose()}>
        <Box sx={{ mb: 2 }}>
          <RatingComponent handleChange={handleChange} />
        </Box>
        <Box>
          <TextareaAutosize
            onChange={(e) => setReason(e.target.value)}
            aria-label="Review Service"
            minRows={10}
            placeholder="Please Mention your Remark.(At least 10 characters)"
            style={{ width: 300 }}
          />
        </Box>
      </DialogBox>
    </>
  );
}
