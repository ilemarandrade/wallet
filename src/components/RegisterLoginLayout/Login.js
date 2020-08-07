import React, { useState } from 'react';
import '../../App.css';
import TextField from '@material-ui/core/TextField';
import {styles, useStylesComplete} from "../../theme/theme.js";
import {ButtonDashboard} from "../../theme/theme.js";
import { useHistory } from "react-router-dom";
import "../../App.css"

function Login(){
const classes =useStylesComplete();
let history = useHistory();
const [valueDocumento,setvalueDocumento]=useState("");
const [valueEmail,setvalueEmail]=useState("");
const loginComplete=()=>{
  let dataUsuarios= JSON.parse(localStorage.getItem("user")).filter(user=>user.documento===valueDocumento);
  console.log(dataUsuarios);
  if(valueDocumento==="" || valueEmail===""){
    alert("Faltan Datos");
    return
  }
  else if(dataUsuarios.length===0){
    alert("Los datos ingresados no coinciden o no esta registrado")
    return
  }
  dataUsuarios[0]["email"]===valueEmail ? history.push("/dashboard"):alert("No coincide el documento con el email")
 }


  const handlerDocumento=(e)=>{
    setvalueDocumento(e.target.value);
  }
  const handlerEmail=(e)=>{
    setvalueEmail(e.target.value);
  }


    return(
        <div>
            <h2 style={{textAlign:"center",color:"white"}}>Login</h2>
            <div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} onChange={handlerDocumento} id="filled-basic" label="Documento" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} onChange={handlerEmail} id="filled-basic" label="Email" variant="filled"/></div>
            </div>
            <div className="perfectCentered"><ButtonDashboard onClick={loginComplete} variant="contained" color="#1ab187">Entrar</ButtonDashboard></div>      
        </div>
    )

}


export default Login