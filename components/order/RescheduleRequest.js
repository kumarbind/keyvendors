// @flow
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import DialogBox from "components/style/DialogBox";
import { SlotSelection } from "components/style/SlotSelection";
import { fetchData,postData } from "services/api";
import { getSlotFormatDate,toastMessage } from "utils/utility";

export function RescheduleRequest({ orderId, selectedService, currentSlot,handelRefresh }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedSlot, setSelectedSlot] = useState({});
  const [selectedItem, setSelectedItem] = useState(0);
  const [dateArray, setDateArray] = useState([]);

  const handleSubmit = async (orderId,selectedService) => {
    try {
      let res = await postData("user/order/status/update", {
        oid: orderId,
        reschedule_date:selectedSlot[selectedService]
      });
      
      await handelRefresh();
      handleClose();
      toastMessage("success",res.message);
    } catch (error) {
      console.error(error);
      toastMessage("error","Somethings went wrong.");
    }
  };

  const handleAddSlot = (slot) => {
    setSelectedSlot(slot);
  };

  useEffect(() => {
    (async () => {
      let dates = await fetchData("date-list");
      let times = await fetchData("time-list");
      setDateArray(getSlotFormatDate(dates, times));
    })();
  }, []);

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ mr: 3 }}
        variant="outlined"
        color="error">
        Reschedule
      </Button>
      <DialogBox
        PaperProps={{ sx: { position: "fixed", top: 30, m: 0 } }}
        title="Reschedule Request"
        open={open}
        disableAction={Object.keys(selectedSlot).length > 0 ? false : true}
        handleSubmit={() => handleSubmit(orderId,selectedService)}
        handleClose={() => handleClose()}
        fullWidth={true}>
        <Box>
          <SlotSelection
            selectedService={selectedService}
            setSelectedItem={setSelectedItem}
            dateArray={dateArray}
            selectedItem={selectedItem}
            selectedSlot={selectedSlot}
            handleAddSlot={handleAddSlot}
          />
        </Box>
      </DialogBox>
    </>
  );
}
