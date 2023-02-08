import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import MainLayout from "../layout/MainLayout";
import { Controller, useForm } from "react-hook-form";
import useRecharge from "../hook/api/useRecharge";
import { yupResolver } from "@hookform/resolvers/yup";
import TextFieldPassword from "../components/TextFieldPassword";
import yup from "../utils/validation";
import { toast } from "react-hot-toast";
import routes from "../constants/routes";
import { useTranslation } from "react-i18next";
import TextFieldOwn from "../components/TextFieldOwn";

const Schema = yup.object().shape({
  amount: yup.number().required(),
  concept: yup.string().required(),
  password: yup.string().required(),
});

function Recharge() {
  const { t } = useTranslation();
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
          toast.success(`${t("toast_message.recharge_success")}`);
          history.push(routes.DASHBOARD);
        },
        onError: ({ message }) => {
          toast.error(message || `${t("toast_message.there_is_error")}`);
        },
      }
    );
  };
  return (
    <MainLayout title={t("services.recharge")}>
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
          {t("services.recharge")}
        </Button>
      </form>
    </MainLayout>
  );
}

export default Recharge;
