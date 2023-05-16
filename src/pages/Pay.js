import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import MainLayout from "../layout/MainLayout";
import { Controller, useForm } from "react-hook-form";
import usePay from "../hook/api/usePay";
import yup from "../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { publicRoutes } from "../constants/routes";
import { useTranslation } from "react-i18next";
import TextFieldOwn from "../components/TextFieldOwn";
import { useQueryClient } from "@tanstack/react-query";
import TextFieldCurrency, {
  formatCurrencyToNumber,
} from "../components/TextFieldCurrency";

const Schema = (t) =>
  yup.object().shape({
    amount: yup.string().required(),
    concept: yup.string().required(),
  });

function Pay() {
  const { t } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutate } = usePay();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(Schema(t)),
  });
  const onSubmit = (values) => {
    mutate(
      { ...values, amount: formatCurrencyToNumber(values.amount) },
      {
        onSuccess: () => {
          reset();
          toast.success(`${t("toast_message.pay_success")}`);
          queryClient.refetchQueries({
            queryKey: ["check_balance"],
          });
          queryClient.refetchQueries({
            queryKey: ["movements"],
          });
          history.push(publicRoutes.DASHBOARD);
        },
        onError: ({ data: { message } }) => {
          toast.error(message || `${t("toast_message.there_is_error")}`);
        },
      }
    );
  };
  return (
    <MainLayout title={t("services.pay")}>
      <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
        <Controller
          control={control}
          name="amount"
          render={({ field, fieldState }) => (
            <TextFieldCurrency
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {t("services.pay")}
        </Button>
      </form>
    </MainLayout>
  );
}

export default Pay;
