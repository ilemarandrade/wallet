import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {styles, useStylesComplete} from "../../theme/theme.js";
import {ButtonDashboard} from "../../theme/theme.js";
import { useHistory } from "react-router-dom";
import {validateOnlyLetters, validateOnlyNumbers, validateEmail} from "../Validadores/validadorInput.js";
import "../../App.css"

function Register(){
const classes =useStylesComplete();
let history = useHistory();
  const handlerRegistrar=()=>{
    history.push("/dashboard");
  }
const [errorDocumento, seterrorDocumento]=useState(false);  
const [errorNombre, seterrorNombre]=useState(false);
const [errorEmail, seterrorEmail]=useState(false);  
const [errorCelular, seterrorCelular]=useState(false);  


  const handlerErrorDocumento=(e)=>{
    seterrorDocumento(validateOnlyNumbers(e.target.value))
  }
  const handlerErrorNombre=(e)=>{
    seterrorNombre(validateOnlyLetters(e.target.value))
  }
  const handlerErrorEmail=(e)=>{
    seterrorEmail(validateEmail(e.target.value));
  }
  const handlerErrorCelular=(e)=>{
    seterrorCelular(validateOnlyNumbers(e.target.value))
  }
    return(
        <div>
            <h2 style={{textAlign:"center",color:"white"}}>Sign up</h2>
            <div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" error={errorDocumento} onChange={handlerErrorDocumento} inputProps={{maxlength:10}} required="true"label="Documento" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" error={errorNombre} onChange={handlerErrorNombre} inputProps={{maxlength:40}} required="true" label="Nombres" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" error={errorEmail}required="true" onChange={handlerErrorEmail} inputProps={{maxlength:45}} label="Email" variant="filled" /></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" error={errorCelular} onChange={handlerErrorCelular} inputProps={{maxlength:12}}required="true" label="Celular" variant="filled" /></div>
                <div className="perfectCentered"><ButtonDashboard onClick={handlerRegistrar} variant="contained" color="#1ab187">Registrar</ButtonDashboard></div>
            </div>
        </div>
    )

}


export default Register