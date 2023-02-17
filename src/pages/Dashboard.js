import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import MainLayout from "../layout/MainLayout";
import routes from "../constants/routes";
import useCheckBalance from "../hook/api/useCheckBalance";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import currency from "../utils/currency";

function Dashboard() {
  let history = useHistory();
  const { t } = useTranslation();
  const { data } = useCheckBalance({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const goRecarga = () => {
    history.push(routes.RECHARGE);
  };
  const goPagar = () => {
    history.push(routes.PAY);
  };
  const goMovements = () => {
    history.push(routes.MOVEMENTS);
  };
  const goConsulta = () => {
    toast.success(
      `${t("toast_message.available_balance")} ${currency(
        data?.available_balance
      )}`
    );
  };

  return (
    <MainLayout title="Dashboard">
      <Box sx={{ mb: 2 }}>
        <Button
          onClick={goRecarga}
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("services.recharge")}
        </Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Button onClick={goPagar} variant="contained" color="primary" fullWidth>
          {t("services.pay")}
        </Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Button
          onClick={goConsulta}
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("services.check_balance")}
        </Button>
      </Box>
      <Button
        onClick={goMovements}
        variant="contained"
        color="primary"
        fullWidth
      >
        {t("services.account_movements")}
      </Button>
    </MainLayout>
  );
}
export default Dashboard;
