import React from "react";
import { Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../utils/validation";
import useRegisterUser from "../hook/api/useRegisterUser";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { publicRoutes } from "../constants/routes";
import { useTranslation } from "react-i18next";
import i18n from "../utils/traductions/i18n";
import TextFieldPassword from "../components/TextFieldPassword";
import TextFieldOwn from "../components/TextFieldOwn";

const Schema = yup.object().shape({
  name: yup.string().required(),
  lastname: yup.string().required(),
  document: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().password().required(),
  confirmation_password: yup
    .string()
    .required(i18n.t("validation_message.confirmation_password"))
    .oneOf(
      [yup.ref("password"), ""],
      i18n.t("validation_message.passwords_not_same")
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
        history.push(publicRoutes.LOGIN);
      },
      onError: ({ data: { message } }) => {
        toast.error(message || `${t("toast_message.there_is_error")}`);
      },
    });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }}>
        {t("forms.titles.signup")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextFieldOwn
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
            <TextFieldOwn
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
            <TextFieldOwn
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
            <TextFieldOwn
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
            <TextFieldOwn
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
            <TextFieldPassword
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
            <TextFieldPassword
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
