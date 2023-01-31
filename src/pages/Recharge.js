import React, { useState } from "react";
import "../App.css";
import { styles, useStylesComplete } from "../theme/theme.js";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { ButtonDashboard } from "../theme/theme.js";

function Recharge() {
  let history = useHistory();
  const classes = useStylesComplete();
  const [valueDocumento, setvalueDocumento] = useState("");
  const [valueCelular, setvalueCelular] = useState("");
  const [valueRecarga, setvalueRecarga] = useState("");
  const handlerDocumento = (e) => {
    setvalueDocumento(e.target.value);
  };
  const handlerRecarga = (e) => {
    setvalueRecarga(e.target.value);
  };
  const handlerCelular = (e) => {
    setvalueCelular(e.target.value);
  };
  const recargar = () => {
    let dataUsuarios = JSON.parse(localStorage.getItem("user"));
    if (valueDocumento === "" || valueCelular === "" || valueRecarga === "") {
      alert("Faltan Datos");
      return;
    }
    dataUsuarios.forEach((ele) => {
      if (ele.documento === valueDocumento) {
        if (ele.celular === valueCelular) {
          ele.saldo = parseInt(ele.saldo) + parseInt(valueRecarga);
          localStorage.setItem("user", JSON.stringify(dataUsuarios));
          history.push("/dashboard");
          alert("Recarga Exitosa");
          return;
        }
        alert("No coincide los datos");
      }
    });
  };
  return (
    <div className="perfectCentered column">
      <h1>Recharge</h1>
      <div>
        <div style={styles.styleContainerDivAction}>
          <div style={styles.marginBottom}>
            <TextField
              classes={{ root: classes.root }}
              onChange={handlerDocumento}
              id="filled-basic"
              label="Documento"
              variant="filled"
            />
          </div>
          <div style={styles.marginBottom}>
            <TextField
              classes={{ root: classes.root }}
              onChange={handlerCelular}
              id="filled-basic"
              label="Celular"
              variant="filled"
            />
          </div>
          <div style={styles.marginBottom}>
            <TextField
              classes={{ root: classes.root }}
              onChange={handlerRecarga}
              type="number"
              inputProps={{ min: "1" }}
              id="filled-basic"
              label="Valor de Recarga"
              variant="filled"
            />
          </div>
          <div className="perfectCentered">
            <ButtonDashboard onClick={recargar} variant="contained">
              Recharge
            </ButtonDashboard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recharge;
