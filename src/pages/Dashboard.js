import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import MainLayout from "../layout/MainLayout";
import routes from "../constants/routes";
import useCheckBalance from "../hook/api/useCheckBalance";
import { toast } from "react-hot-toast";

function Dashboard() {
  let history = useHistory();
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
  const goConsulta = () => {
    toast.success(`Tu saldo disponible es: $${data?.available_balance}`);
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
          Recargar
        </Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Button onClick={goPagar} variant="contained" color="primary" fullWidth>
          Pagar
        </Button>
      </Box>
      <Button
        onClick={goConsulta}
        variant="contained"
        color="primary"
        fullWidth
      >
        Consultar Saldo
      </Button>
    </MainLayout>
  );
}
export default Dashboard;
