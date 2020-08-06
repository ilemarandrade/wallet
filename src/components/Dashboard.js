import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import "../App.css"


const ButtonDashboard = withStyles({
    root: {
        background:"#1ab187",
        width: "100%",
        marginBottom:"5%"
    }
  })(Button);

function Dashboard(){
    let history = useHistory();
  const goRecarga=()=>{
    history.push("/dashboard/recarga");
  }
  const goPagar=()=>{
    history.push("/dashboard/pagar");
  }
  const goConsulta=()=>{
    history.push("/dashboard/consultarsaldo");
  }
  
    return(
        <div id="registerOrLogin"className="perfectCentered">
        <h1>Dashboard</h1>
        <div  className="perfectCentered" style={styleContainerButton}>
        <ButtonDashboard onClick={goRecarga} variant="contained">Recargar</ButtonDashboard>
        <ButtonDashboard onClick={goPagar}  variant="contained">Pagar</ButtonDashboard>
        <ButtonDashboard  onClick={goConsulta} variant="contained">Consultar Saldo</ButtonDashboard>
        </div>
    </div>
    )
    
}
export default Dashboard

const styleContainerButton={
    background:"#24303c",
    padding: "5vh",
    width: "20vw",
    flexDirection:"column"
}
