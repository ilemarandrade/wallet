import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import "../App.css";
import {styles, useStylesComplete} from "../theme/theme.js"
import TextField from '@material-ui/core/TextField';
import {ButtonDashboard} from "../theme/theme.js";
 
function Pagar(){
    let history=useHistory();
    const classes =useStylesComplete();
    const [valueEmail, setvalueEmail]=useState("");   
    const [valueMontoPago, setvalueMontoPago]=useState(""); 
    const [valueConceptoPago, setvalueConcepto]=useState(""); 
    const handlerEmail=(e)=>{
        setvalueEmail(e.target.value);
        }
      const handlerMontoPago=(e)=>{
        setvalueMontoPago(e.target.value);
      }
      const handlerConceptoPago=(e)=>{
        setvalueConcepto(e.target.value);
        }
    const Pagar=()=>{

        let dataUsuarios= JSON.parse(localStorage.getItem("user"))
        if(valueEmail==="" || valueMontoPago==="" || valueConceptoPago===""){
            alert("Faltan Datos");
            return
          }
          dataUsuarios.forEach(ele => {
            if(ele.email===valueEmail){
                    if(parseInt(ele.saldo)< parseInt(valueMontoPago)){
                        alert("Saldo insuficiente para hacer esta operacion");
                    }
                    ele.saldo =parseInt(ele.saldo)-parseInt(valueMontoPago)
                 localStorage.setItem("user",JSON.stringify(dataUsuarios));
                 history.push("/dashboard")
                 return
                }
          });


    }
    return(
    <div className="perfectCentered column">
        <h1>Pagar</h1>
        <div>
            <div  style={styles.styleContainerDivAction}>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} onChange={handlerEmail} id="filled-basic" label="Email" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} onChange={handlerMontoPago} id="filled-basic" label="Monto de Pago" variant="filled" /></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} onChange={handlerConceptoPago} id="filled-basic" label="Concepto de Pago" variant="filled" /></div>
                <div className="perfectCentered"><ButtonDashboard onClick={Pagar} variant="contained" color="#1ab187">Pagar</ButtonDashboard></div>
            </div>
        </div>
      
    </div>
    )
}

export default Pagar
