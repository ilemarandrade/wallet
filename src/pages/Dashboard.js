import React from "react";
import { Box, Button } from "@material-ui/core";
import MainLayout from "../layout/MainLayout";
import { privateRoutes } from "../constants/routes";
import useCheckBalance from "../hook/api/useCheckBalance";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import currency from "../utils/currency";
import { Link } from "react-router-dom";

function Dashboard() {
  const { t } = useTranslation();
  const { data } = useCheckBalance({
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
          component={Link}
          to={privateRoutes.RECHARGE}
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("services.recharge")}
        </Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Button
          component={Link}
          to={privateRoutes.PAY}
          variant="contained"
          color="primary"
          fullWidth
        >
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
        component={Link}
        to={privateRoutes.MOVEMENTS}
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
