import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@material-ui/core";

function Login() {
  let history = useHistory();
  const [valueDocumento, setvalueDocumento] = useState("");
  const [valueEmail, setvalueEmail] = useState("");
  const loginComplete = () => {
    let dataUsuarios = JSON.parse(localStorage.getItem("user")).filter(
      (user) => user.documento === valueDocumento
    );
    if (valueDocumento === "" || valueEmail === "") {
      alert("Faltan Datos");
      return;
    } else if (dataUsuarios.length === 0) {
      alert("Los datos ingresados no coinciden o no esta registrado");
      return;
    } else if (dataUsuarios[0]["email"] === valueEmail) {
      history.push("/dashboard");
      localStorage.setItem(
        "userLogin",
        JSON.stringify([
          { userLogiado: true, userOnline: dataUsuarios[0]["nombres"] },
        ])
      );
    } else {
      alert("No coincide el documento con el email");
    }
  };

  const handlerDocumento = (e) => {
    setvalueDocumento(e.target.value);
  };
  const handlerEmail = (e) => {
    setvalueEmail(e.target.value);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }}>Login</h2>
      <Box sx={{ mb: 1 }}>
        <div>
          <TextField
            onChange={handlerDocumento}
            label="Documento"
            variant="filled"
            fullWidth
          />
        </div>
        <div>
          <TextField
            onChange={handlerEmail}
            label="Email"
            variant="filled"
            fullWidth
          />
        </div>
      </Box>
      <Button
        onClick={loginComplete}
        variant="contained"
        color="primary"
        fullWidth
        sx={{}}
      >
        Entrar
      </Button>
    </div>
  );
}

export default Login;
