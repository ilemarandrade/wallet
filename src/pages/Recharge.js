import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import MainLayout from "../layout/MainLayout";
import { Controller, useForm } from "react-hook-form";
import useRecharge from "../hook/api/useRecharge";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFieldPassword from "../components/TextFieldPassword";
import yup from "../utils/validation";
import { toast } from "react-hot-toast";
import routes from "../constants/routes";

const Schema = yup.object().shape({
  amount: yup.number().required(),
  concept: yup.string().required(),
  password: yup.string().required(),
});

function Recharge() {
  const { mutate } = useRecharge();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(Schema),
  });

  let history = useHistory();
  const onSubmit = (values) => {
    mutate(
      { ...values },
      {
        onSuccess: (data) => {
          reset();
          toast.success("Recarga completada exitosamente");
          history.push(routes.DASHBOARD);
        },
        onError: ({ message }) => {
          toast.error(message || "Ha ocurrido un error");
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
            <TextFieldPassword
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
