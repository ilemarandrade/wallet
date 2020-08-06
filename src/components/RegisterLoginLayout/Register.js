import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import {styles, useStylesComplete} from "../../theme/theme.js";
import {ButtonDashboard} from "../../theme/theme.js";
import { useHistory } from "react-router-dom";
import {validateOnlyLetters, validateOnlyNumbers, validateEmail} from "../Validadores/validadorInput.js";
import "../../App.css"

function Register(){
const classes =useStylesComplete();
let history = useHistory();
const [errorDocumento, seterrorDocumento]=useState(false);  
const [errorNombre, seterrorNombre]=useState(false);
const [errorEmail, seterrorEmail]=useState(false);  
const [errorCelular, seterrorCelular]=useState(false);  
  
const handlerRegistrar=()=>{
  if((!errorDocumento && !errorEmail) && (!errorCelular && !errorNombre)){
    history.push("/dashboard");
  }  
  else{
    alert("Completa los campos correctamente");
  }
  

}
  const handlerDocumento=(e)=>{
    seterrorDocumento(validateOnlyNumbers(e.target.value))
    console.log(errorDocumento)
  }
  const handlerNombre=(e)=>{
    seterrorNombre(validateOnlyLetters(e.target.value))
  }
  const handlerEmail=(e)=>{
    seterrorEmail(validateEmail(e.target.value));
    //setusuarioRegistrado(usuarioRegistrado.email=e.target.value)  
  }
  const handlerCelular=(e)=>{
    seterrorCelular(validateOnlyNumbers(e.target.value))
    //setusuarioRegistrado(usuarioRegistrado.celular=e.target.value);
  }

    return(
        <div>
            <h2 style={{textAlign:"center",color:"white"}}>Sign up</h2>
            <div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="documento" error={errorDocumento} onChange={handlerDocumento} inputProps={{maxlength:10}} required="true"label="Documento" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="nombres" error={errorNombre} onChange={handlerNombre} inputProps={{maxlength:40}} required="true" label="Nombres" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="email" error={errorEmail} required="true" onChange={handlerEmail} inputProps={{maxlength:45}} label="Email" variant="filled" /></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} error={errorCelular} onChange={handlerCelular} inputProps={{maxlength:12}}required="true" label="Celular" variant="filled" /></div>
                <div className="perfectCentered"><ButtonDashboard onClick={handlerRegistrar} variant="contained" color="#1ab187">Registrar</ButtonDashboard></div>
            </div>
        </div>
    )

}


export default Register