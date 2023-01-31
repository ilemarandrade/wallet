import React, { useState } from "react";
import "./RegisterOrLogin.css";
import Register from "./Register.js";
import Login from "./Login.js";

function RegisterOrLogin() {
  const [typeProcess, setTypeProcess] = useState(true);
  const form = !typeProcess ? <Register /> : <Login />;
  const handlerTypeProcess = () => setTypeProcess(!typeProcess);

  return (
    <div id="registerOrLogin" className="perfectCentered">
      <h1>Billetera</h1>
      <div id="containerLogin">
        <div id="signUpOrLogin">
          <div
            id="Signup"
            className="divsignUpOrLogin perfectCentered"
            onClick={handlerTypeProcess}
            style={{ background: !typeProcess ? "#1ab187" : "#435258" }}
          >
            <p id="Signup">Sign up</p>
          </div>
          <div
            className="divsignUpOrLogin perfectCentered"
            onClick={handlerTypeProcess}
            style={{ background: !typeProcess ? "#435258" : "#1ab187" }}
          >
            <p>Login</p>
          </div>
        </div>
        <div>{form}</div>
      </div>
    </div>
  );
}
export default RegisterOrLogin;
