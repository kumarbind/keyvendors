// @flow
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DialogBox from "components/style/DialogBox";
import { fetchData, postData } from "services/api";
import { toastMessage } from "utils/utility";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function AvailabilityModal({
  handelRefresh,
  actionTitle,
  data,
  isOpen,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handelRefresh({ date: date, time: selectedTime });
  };
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const [timeArray, setTimeArray] = useState([]);
  const [selectedTime, setSelectedTime] = useState({});

  const handleSave = () => {
    handleClose();
    handelRefresh({ date: date, ...selectedTime });
  };
  const handleTimeChange = (e, slot, time) => {
    let checked = e.target.checked;
    let dateValue = date;
    let slot_label = `${slot.toLowerCase()}_times`;
    if (dateValue) {
      setDateError(false);
      let times = [
        ...(selectedTime[slot_label] ? selectedTime[slot_label] : []),
      ];
      if (checked && !times.some((val) => val.time === time)) {
        times.push({ value: time });
      } else {
        times.pop({ value: time });
        if (times.length < 1) {
          times = undefined;
        }
      }

      setSelectedTime({
        ...selectedTime,
        [slot_label]: times,
      });
    } else {
      setDateError(true);
    }
  };

  const isThatTime = (slot, time) => {
    if (data) {
      console.log(data);
      return data[`${slot.toLowerCase()}_times`]
        ? data[`${slot.toLowerCase()}_times`].some((val) => val.value == time)
        : false;
    } else {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      let times = await fetchData("time-list");
      setTimeArray(times);
    })();
  }, []);

  useEffect(() => {
    setOpen(isOpen !== undefined ? isOpen : false);
    if (data) {
      setDate(data.date);
    }
  }, [isOpen, data]);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        {actionTitle}
      </Button>
      <DialogBox
        title={`Select Availability`}
        open={open}
        handleClose={() => handleClose()}
        handleSubmit={() => handleSave()}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item>
                <TextField
                  error={dateError}
                  id="date"
                  label="Date"
                  variant="outlined"
                  type="date"
                  fullWidth
                  value={date}
                  disabled={data ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setSelectedTime([]);
                  }}
                />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={6}>
                {Object.keys(timeArray).map((slot, key) => (
                  <Grid xs={4} item key={key}>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          fontWeight: 12,
                          color: "red",
                        }}>
                        {slot}
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          {timeArray[slot].map((time, key) => (
                            <Grid item key={key}>
                              <FormControlLabel
                                label={
                                  <Box component="div" fontSize={12}>
                                    {time}
                                  </Box>
                                }
                                control={
                                  <Checkbox
                                    defaultChecked={isThatTime(slot, time)}
                                    disabled={date ? false : true}
                                    onChange={(e) =>
                                      handleTimeChange(e, slot, time)
                                    }
                                  />
                                }
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogBox>
    </>
  );
}
