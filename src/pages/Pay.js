import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import MainLayout from "../layout/MainLayout";
import { Controller, useForm } from "react-hook-form";
import usePay from "../hook/api/usePay";
import yup from "../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import routes from "../constants/routes";
import TextFieldPassword from "../components/TextFieldPassword";
import { useTranslation } from "react-i18next";
import TextFieldOwn from "../components/TextFieldOwn";

const Schema = (t) =>
  yup.object().shape({
    amount: yup.number().typeError(t("validation_message.number")).required(),
    concept: yup.string().required(),
    password: yup.string().required(),
  });

function Pay() {
  const { t } = useTranslation();
  let history = useHistory();
  const { mutate } = usePay();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(Schema(t)),
  });
  const onSubmit = (values) => {
    mutate(
      { ...values },
      {
        onSuccess: () => {
          reset();
          toast.success(`${t("toast_message.pay_success")}`);
          history.push(routes.DASHBOARD);
        },
        onError: ({ message }) => {
          toast.error(message || `${t("toast_message.there_is_error")}`);
        },
      }
    );
  };
  return (
    <MainLayout title={t("services.pay")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="amount"
          render={({ field, fieldState }) => (
            <TextFieldOwn
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label={t("forms.labels.amount")}
              variant="filled"
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="concept"
          render={({ field, fieldState }) => (
            <TextFieldOwn
              {...{ ...field }}
              error={fieldState.error}
              helperText={fieldState?.error?.message}
              label={t("forms.labels.concept")}
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {t("services.pay")}
        </Button>
      </form>
    </MainLayout>
  );
}

export default Pay;
