import React, { useEffect } from 'react';
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

function App() {
  useEffect(() => {crearStorage();},[]);
  return (
      <Router>
        <div className="app">  
          <Switch>
            <Route exact path="/">
              <RegisterOrLogin></RegisterOrLogin>
            </Route>
            <Route exact  path="/dashboard">
              <Dashboard></Dashboard>
            </Route>
            <Route exact  path="/dashboard/recarga">
              <Recargar></Recargar>
            </Route>
            <Route exact  path="/dashboard/pagar">
              <Pagar></Pagar>
            </Route>
            <Route exact  path="/dashboard/consultadesaldo">
              <Consulta></Consulta>
            </Route>
          </Switch>
          </div> 
      </Router>
  );
}

export default App;
