import React from "react";
import { Box, Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../utils/validation";
import TextFieldPassword from "../components/TextFieldPassword";
import { useStateUser } from "../providers/UserProvider";
import { useTranslation } from "react-i18next";
import TextFieldOwn from "../components/TextFieldOwn";

const Schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Login() {
  const { login } = useStateUser();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(Schema),
  });

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }}>
        {t("forms.titles.login")}
      </h2>
      <form component="form" onSubmit={handleSubmit(login)}>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextFieldOwn
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              variant="filled"
              label={t("forms.labels.email")}
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
              label={t("forms.labels.password")}
              fullWidth
            />
          )}
        />
        <Box sx={{ mt: 1 }}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            {t("forms.buttons.login")}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Login;
