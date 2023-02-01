import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

function Dashboard() {
  let history = useHistory();
  const goRecarga = () => {
    history.push("/dashboard/recarga");
  };
  const goPagar = () => {
    history.push("/dashboard/pagar");
  };
  const goConsulta = () => {
    history.push("/dashboard/consultadesaldo");
  };

  return (
    <div id="registerOrLogin" className="perfectCentered">
      <h1>Dashboard</h1>
      <div className="perfectCentered">
        <Button onClick={goRecarga} variant="contained">
          Recargar
        </Button>
        <Button onClick={goPagar} variant="contained">
          Pagar
        </Button>
        <Button onClick={goConsulta} variant="contained">
          Consultar Saldo
        </Button>
      </div>
    </div>
  );
}
export default Dashboard;
