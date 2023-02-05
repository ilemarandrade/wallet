import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import MainLayout from "../layout/MainLayout";
import { Controller, useForm } from "react-hook-form";
import useRecharge from "../hook/api/useRecharge";

function Recharge() {
  const { mutate } = useRecharge();
  const { handleSubmit, control } = useForm({
    defaultValues: { email: "", password: "" },
    // resolver: yupResolver(Schema),
  });

  let history = useHistory();
  const onSubmit = (values) => {
    mutate(
      { ...values },
      {
        onSuccess: (data) => {
          console.log(data);
        },
      }
    );
  };
  return (
    <MainLayout title="Recharge">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="amount"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label="Amount"
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="concept"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label="Concept"
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label="Password"
              variant="filled"
              fullWidth
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Recharge
        </Button>
      </form>
    </MainLayout>
  );
}

export default Recharge;
