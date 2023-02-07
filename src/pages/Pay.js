import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import MainLayout from "../layout/MainLayout";
import { Controller, useForm } from "react-hook-form";
import usePay from "../hook/api/usePay";
import yup from "../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import routes from "../constants/routes";
import TextFieldPassword from "../components/TextFieldPassword";

const Schema = yup.object().shape({
  amount: yup.number().required(),
  concept: yup.string().required(),
  password: yup.string().required(),
});

function Pay() {
  let history = useHistory();
  const { mutate } = usePay();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(Schema),
  });
  const onSubmit = (values) => {
    mutate(
      { ...values },
      {
        onSuccess: () => {
          reset();
          toast.success("Pago completado exitosamente");
          history.push(routes.DASHBOARD);
        },
        onError: ({ message }) => {
          toast.error(message || "Ha ocurrido un error");
        },
      }
    );
  };
  return (
    <MainLayout title="Pay">
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

export default Pay;
