import React from "react";
import { Box, Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../utils/validation";
import TextFieldPassword from "../components/TextFieldPassword";
import { useTranslation } from "react-i18next";
import TextFieldOwn from "../components/TextFieldOwn";
import { publicRoutes } from "../constants/routes";
import useForgotPassword from "../hook/api/useForgotPassword";
import { toast } from "react-hot-toast";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import queryString from "query-string";
import useNewPassword from "../hook/api/useNewPassword";
import i18n from "../utils/traductions/i18n";
import { Link } from "react-router-dom";

const Schema = yup.object().shape({
  email: yup.string().email().required(),
});

const SchemaNewPassword = yup.object().shape({
  password: yup.string().password().required(),
  confirmation_password: yup
    .string()
    .required(i18n.t("validation_message.confirmation_password"))
    .oneOf(
      [yup.ref("password"), ""],
      i18n.t("validation_message.passwords_not_same")
    ),
});

const defaultValues = {
  email: "",
};

const defaultValuesNewPassword = {
  new_password: "",
  confirmation_password: "",
};

function ForgotPassword() {
  const { search } = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const { mutate } = useForgotPassword();
  const { mutate: mutateNewPassword } = useNewPassword();
  const token = queryString.parse(search).token;

  const { handleSubmit, control } = useForm({
    defaultValues: token ? defaultValues : defaultValuesNewPassword,
    resolver: yupResolver(token ? SchemaNewPassword : Schema),
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

  const newPassword = (values) => {
    mutateNewPassword(
      { ...values, token },
      {
        onSuccess: ({ message }) => {
          toast.success(message);
          history.push(publicRoutes.INIT);
        },
        onError: ({ data: { message } }) => {
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
      <form onSubmit={handleSubmit(token ? newPassword : sendCodeToEmail)}>
        {token ? (
          <>
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <TextFieldPassword
                  {...{ ...field }}
                  error={fieldState.error}
                  helperText={fieldState?.error?.message}
                  variant="filled"
                  label={t("forms.labels.new_password")}
                  fullWidth
                />
              )}
            />
            <Controller
              control={control}
              name="confirmation_password"
              render={({ field, fieldState }) => (
                <TextFieldPassword
                  {...{ ...field }}
                  error={fieldState.error}
                  helperText={fieldState?.error?.message}
                  variant="filled"
                  label={t("forms.labels.confirmation_password")}
                  fullWidth
                />
              )}
            />
          </>
        ) : (
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
        )}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            {t("forms.buttons.send")}
          </Button>
        </Box>
        {!token && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="default"
              fullWidth
              component={Link}
              to={publicRoutes.LOGIN}
            >
              {t("forms.buttons.back")}
            </Button>
          </Box>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
