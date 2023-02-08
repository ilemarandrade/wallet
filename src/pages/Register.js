import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../utils/validation";
import useRegisterUser from "../hook/api/useRegisterUser";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import routes from "../constants/routes";
import { useTranslation } from "react-i18next";
import { t } from "../utils/traductions/i18n";

const Schema = yup.object().shape({
  name: yup.string().required(),
  lastname: yup.string().required(),
  document: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmation_password: yup
    .string()
    .required(t("validation_message.confirmation_password"))
    .oneOf(
      [yup.ref("password"), ""],
      t("validation_message.confirmation_password")
    ),
});
function Register() {
  const history = useHistory();
  const { t } = useTranslation();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(Schema),
  });
  const { mutate } = useRegisterUser();
  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        toast.success(`${t("toast_message.register_success")}`);
        history.push(routes.LOGIN);
      },
      onError: ({ message }) => {
        toast.error(message || `${t("toast_message.there_is_error")}`);
      },
    });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }}>
        {t("forms.titles.signup")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label={t("forms.labels.name")}
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="lastname"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label={t("forms.labels.lastname")}
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label={t("forms.labels.email")}
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="document"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label={t("forms.labels.document")}
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label={t("forms.labels.phone")}
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
              label={t("forms.labels.password")}
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="confirmation_password"
          render={({ field, fieldState }) => (
            <TextField
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label={t("forms.labels.confirmation_password")}
              variant="filled"
              fullWidth
            />
          )}
        />
        <div className="perfectCentered">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {t("forms.buttons.register")}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
