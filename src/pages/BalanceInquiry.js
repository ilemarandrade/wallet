import React, {useState} from 'react';
import "../App.css";
import {styles, useStylesComplete} from "../theme/theme.js"
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import {ButtonDashboard} from "../theme/theme.js";

function Consulta(){
    const classes =useStylesComplete();
    let history = useHistory();
    const [valueEmail, setvalueEmail]=useState("");  
    const [valueCelular, setvalueCelular]=useState(""); 
    const handlerEmail=(e)=>{
        setvalueEmail(e.target.value);
        }

    const handlerCelular=(e)=>{
        setvalueCelular(e.target.value);
    }
    const getSaldo=()=>{
        let dataUsuarios= JSON.parse(localStorage.getItem("user"))
        if(valueEmail==="" || valueCelular===""){
            alert("Faltan Datos");
            return
          }
          dataUsuarios.forEach(ele => {
            if(ele.email===valueEmail){
                if(ele.celular===valueCelular){
                 alert("Este es tu saldo actual " + ele.saldo)
                 history.push("/dashboard")
                 return
                }
                alert("No coincide los datos");
            }  
          });

    }


    return(
    <div className="perfectCentered column">
        <h1>Consulta de Saldo</h1>
        <div>
            <div style={styles.styleContainerDivAction}>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} onChange={handlerEmail} id="filled-basic" label="Email" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} onChange={handlerCelular}id="filled-basic" label="Numero Celular" variant="filled" /></div>
                <div className="perfectCentered"><ButtonDashboard onClick={getSaldo} variant="contained" color="#1ab187">Consultar</ButtonDashboard></div>
            </div>
        </div>
      
    </div>
    )
}

export default Consulta
