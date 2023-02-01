import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";

const PrivateRoute = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [notDashboard, setnotDashboard] = useState(false);
  const history = useHistory();
  React.useEffect(() => {
    history.location.pathname === "/dashboard"
      ? setnotDashboard(false)
      : setnotDashboard(true);
    if (JSON.parse(localStorage.getItem("userLogin")) === null) {
      setTimeout(() => {
        history.push("/");
      }, 5000);
    } else {
      setIsLoading(false);
      setUsuario(
        JSON.parse(localStorage.getItem("userLogin"))[0]["userOnline"]
      );
    }
  }, [history.location.pathname]);
  const cerrarSesion = () => {
    history.push("/");
    localStorage.removeItem("userLogin");
  };
  const backToDashboard = () => {
    history.push("/dashboard");
  };

  return (
    <>
      {isLoading ? null : ( // <div style={{ color: "white" }}>Cargando...</div>
        <Route {...props}>
          <div style={{ display: "flex" }}>
            <div style={stylesOfuserActived}>
              User: {usuario} <br></br>
              <p onClick={cerrarSesion} style={pCerrarSesion}>
                CerrarSesion
              </p>
            </div>
            <div
              onClick={backToDashboard}
              style={{
                ...stylesOfBackDashboard,
                display: notDashboard ? "" : "none",
              }}
            >
              <p onClick={backToDashboard}>Volver a Dashboard</p>
            </div>
          </div>
          {props.children}
        </Route>
      )}
    </>
  );
};

const stylesOfuserActived = {
  background: "#1ab187",
  color: "white",
  width: "200px",
  textAlign: "center",
  padding: "1px 0",
  borderRadius: "5px 70px",
};
const stylesOfBackDashboard = {
  background: "#1ab187",
  color: "white",
  width: "200px",
  textAlign: "center",
  padding: "1px 0",
  borderRadius: "5px 70px",
  marginTop: "1px",
};
const pCerrarSesion = {
  textDecoration: "underline",
  color: "#146f56",
  margin: "0px",
};

export default PrivateRoute;
