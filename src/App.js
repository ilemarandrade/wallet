import React, { useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";
import {crearStorage} from "./localStorage.js"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import RegisterOrLogin from "./components/RegisterOrLogin";
import Dashboard from "./components/Dashboard.js" ;
import Consulta from "./components/Consulta.js"
import Recargar from "./components/Recargar.js"
import Pagar from "./components/Pagar.js"
import PrivateRoute from "./components/PrivateRoute"


function App() {
  useEffect(() => {crearStorage();},[]);

  return (
      <Router>
        <div className="app">  
          <Switch>
            <Route exact path="/">
              <RegisterOrLogin></RegisterOrLogin>
            </Route>
            <PrivateRoute exact  path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <PrivateRoute exact  path="/dashboard/recarga">
              <Recargar></Recargar>
            </PrivateRoute>
            <PrivateRoute exact  path="/dashboard/pagar">
              <Pagar></Pagar>
            </PrivateRoute>
            <PrivateRoute exact  path="/dashboard/consultadesaldo">
              <Consulta></Consulta>
            </PrivateRoute>
          </Switch>
          <div style={styleMadeBy}>Creado por el web developer Ilemar Andrade</div>
          </div> 
      </Router>
  );
}

const styleMadeBy={
  borderTop: "#f9f9f9 1px solid",
  color: "white",
  textAlign: "center",
  marginTop: "30px",
  position: "absolute",
  bottom: "2%",
  width: "100%",
}
export default App;
