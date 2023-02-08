import React from "react";
import { TextField } from "@material-ui/core";

const TextFieldOwn = ({ onChange, ...props }) => {
  return (
    <TextField
      {...{
        ...props,
        onChange: (ref) =>
          onChange({
            ...ref,
            currentTarget: {
              ...ref.currentTarget,
              value: ref.currentTarget.value.trim(),
            },
          }),
      }}
    />
  );
};

export default TextFieldOwn;
