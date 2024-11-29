import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

export default function BasicDatePicker() {
  const [value, setValue] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    if (!value) setErrorMessage("error");
    if (!!value) setErrorMessage(null);
  }, [value]);

  return (
   
      <FormControl aria-label={"test"}>
        <DatePicker
          label="Basic example"
          value={value}
          error
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField error={!!errorMessage} {...params} />
          )}
        />
        {!!errorMessage && (
          <FormHelperText error margin="dense">
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    
  );
}
