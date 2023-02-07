import React from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";

const TextFieldPassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...{ ...props, type: showPassword ? "text" : "password" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextFieldPassword;
