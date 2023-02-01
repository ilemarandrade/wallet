import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

function Consulta() {
  let history = useHistory();
  const [valueEmail, setvalueEmail] = useState("");
  const [valueCelular, setvalueCelular] = useState("");
  const handlerEmail = (e) => {
    setvalueEmail(e.target.value);
  };

  const handlerCelular = (e) => {
    setvalueCelular(e.target.value);
  };
  const getSaldo = () => {
    let dataUsuarios = JSON.parse(localStorage.getItem("user"));
    if (valueEmail === "" || valueCelular === "") {
      alert("Faltan Datos");
      return;
    }
    dataUsuarios.forEach((ele) => {
      if (ele.email === valueEmail) {
        if (ele.celular === valueCelular) {
          alert("Este es tu saldo actual " + ele.saldo);
          history.push("/dashboard");
          return;
        }
        alert("No coincide los datos");
      }
    });
  };

  return (
    <div className="perfectCentered column">
      <h1>Consulta de Saldo</h1>
      <div>
        <div>
          <div>
            <TextField
              onChange={handlerEmail}
              id="filled-basic"
              label="Email"
              variant="filled"
            />
          </div>
          <div>
            <TextField
              onChange={handlerCelular}
              id="filled-basic"
              label="Numero Celular"
              variant="filled"
            />
          </div>
          <div className="perfectCentered">
            <Button onClick={getSaldo} variant="contained" color="#1ab187">
              Consultar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consulta;
