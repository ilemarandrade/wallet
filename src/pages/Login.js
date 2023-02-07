import React from "react";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../utils/validation";
import TextFieldPassword from "../components/TextFieldPassword";
import { useStateUser } from "../providers/UserProvider";

const Schema = yup.object().shape({
  email: yup.string().email().required("Es requerido"),
  password: yup.string().required("Es requerido"),
});

function Login() {
  const { login } = useStateUser();
  const { handleSubmit, control } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(Schema),
  });

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }}>Login</h2>
      <form component="form" onSubmit={handleSubmit(login)}>
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
            <TextFieldPassword
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
