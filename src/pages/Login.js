import React from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import instance from "../utils/axiosInstance";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../utils/validation";
import useLogin from "../hook/api/useLogin";
import { setLocalStorageKey } from "../utils/localstoragesKeys";
import routes from "../constants/routes";

const Schema = yup.object().shape({
  email: yup.string().email().required("Es requerido"),
  password: yup.string().required("Es requerido"),
});

function Login() {
  let history = useHistory();
  const { handleSubmit, control } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(Schema),
  });
  const { mutate } = useLogin();
  const loginComplete = async (values) => {
    mutate(
      { ...values },
      {
        onSuccess: (data) => {
          setLocalStorageKey(data.jwt);
          history.push(routes.DASHBOARD);
        },
      }
    );
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }}>Login</h2>
      <form component="form" onSubmit={handleSubmit(loginComplete)}>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              variant="filled"
              label="Email"
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
              variant="filled"
              label="Password"
              fullWidth
            />
          )}
        />
        <Box sx={{ mt: 1 }}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Iniciar Sesion
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Login;
