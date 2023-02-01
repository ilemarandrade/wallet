import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

function Pagar() {
  let history = useHistory();
  const [valueEmail, setvalueEmail] = useState("");
  const [valueMontoPago, setvalueMontoPago] = useState("");
  const [valueConceptoPago, setvalueConcepto] = useState("");
  const handlerEmail = (e) => {
    setvalueEmail(e.target.value);
  };
  const handlerMontoPago = (e) => {
    setvalueMontoPago(e.target.value);
  };
  const handlerConceptoPago = (e) => {
    setvalueConcepto(e.target.value);
  };
  const Pagar = () => {
    let dataUsuarios = JSON.parse(localStorage.getItem("user"));
    if (
      valueEmail === "" ||
      valueMontoPago === "" ||
      valueConceptoPago === ""
    ) {
      alert("Faltan Datos");
      return;
    }
    dataUsuarios.forEach((ele) => {
      if (ele.email === valueEmail) {
        if (parseInt(ele.saldo) < parseInt(valueMontoPago)) {
          alert("Saldo insuficiente para hacer esta operacion");
          return;
        }
        ele.saldo = parseInt(ele.saldo) - parseInt(valueMontoPago);
        localStorage.setItem("user", JSON.stringify(dataUsuarios));
        history.push("/dashboard");
        alert("Pago exitoso");
        return;
      }
    });
  };
  return (
    <div className="perfectCentered column">
      <h1>Pagar</h1>
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
              onChange={handlerMontoPago}
              type="number"
              inputProps={{ min: "1" }}
              id="filled-basic"
              label="Monto de Pago"
              variant="filled"
            />
          </div>
          <div>
            <TextField
              onChange={handlerConceptoPago}
              id="filled-basic"
              label="Concepto de Pago"
              variant="filled"
            />
          </div>
          <div className="perfectCentered">
            <Button onClick={Pagar} variant="contained" color="#1ab187">
              Pagar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagar;
