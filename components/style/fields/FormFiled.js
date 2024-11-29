// @flow
import * as React from "react";
import { TextField } from "@mui/material";

export function FormFiled({ fieldValues, handleChange }) {
  return (
    <>  
    {fieldValues.prefix && fieldValues.prefix }
        <TextField
          size="small"
          required
          label={fieldValues.label}
          name={fieldValues.id}
          error={fieldValues.error}
          value={fieldValues.value ? fieldValues.value : ""}
          helperText={fieldValues.error && fieldValues.errorMessage}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ width:{lg:"30rem"} }}
          {...fieldValues.props}
        />            
    </>
  );
}
