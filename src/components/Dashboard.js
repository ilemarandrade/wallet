import React from 'react';
import {styles, ButtonDashboard} from "../theme/theme.js"
import { useHistory } from "react-router-dom";
import "../App.css"

function Dashboard(){
    let history = useHistory();
  const goRecarga=()=>{
    history.push("/dashboard/recarga");
  }
  const goPagar=()=>{
    history.push("/dashboard/pagar");
  }
  const goConsulta=()=>{
    history.push("/dashboard/consultadesaldo");
  }
  
    return(
        <div id="registerOrLogin"className="perfectCentered">
        <h1>Dashboard</h1>
        <div  className="perfectCentered" style={styles.styleContainerDivAction}>
          <ButtonDashboard onClick={goRecarga} variant="contained">Recargar</ButtonDashboard>
          <ButtonDashboard onClick={goPagar}  variant="contained">Pagar</ButtonDashboard>
          <ButtonDashboard  onClick={goConsulta} variant="contained">Consultar Saldo</ButtonDashboard>
        </div>
    </div>
    )
    
}
export default Dashboard
