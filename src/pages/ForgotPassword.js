import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../utils/validation";
import TextFieldPassword from "../components/TextFieldPassword";
import { useStateUser } from "../providers/UserProvider";
import { useTranslation } from "react-i18next";
import TextFieldOwn from "../components/TextFieldOwn";
import { Link } from "react-router-dom";
import { publicRoutes } from "../constants/routes";
import useForgotPassword from "../hook/api/useForgotPassword";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Schema = yup.object().shape({
  email: yup.string().email().required(),
});

function ForgotPassword() {
  const history = useHistory();
  const { t } = useTranslation();
  const { mutate } = useForgotPassword();
  const { handleSubmit, control } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(Schema),
  });

  const sendCodeToEmail = ({ email }) => {
    mutate(
      { email },
      {
        onSuccess: ({ message }) => {
          toast.success(message);
          history.push(publicRoutes.INIT);
        },
        onError: ({ message }) => {
          toast.error(message || `${t("toast_message.there_is_error")}`);
        },
      }
    );
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }}>
        {t("forms.titles.forgot_password")}
      </h2>
      <form component="form" onSubmit={handleSubmit(sendCodeToEmail)}>
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
        {/* <Controller
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
        /> */}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            {t("forms.buttons.send")}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default ForgotPassword;
