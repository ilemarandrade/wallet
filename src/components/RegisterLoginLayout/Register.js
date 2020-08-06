import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {styles, useStylesComplete} from "../../theme/theme.js";
import {ButtonDashboard} from "../../theme/theme.js";
import { useHistory } from "react-router-dom";
import "../../App.css"

function Register(){
const classes =useStylesComplete();
let history = useHistory();
  const handlerRegistrar=()=>{
    history.push("/dashboard");
  }

    return(
        <div>
            <h2 style={{textAlign:"center",color:"white"}}>Sign up</h2>
            <div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Documento" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Nombres" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}}id="filled-basic" label="Email" variant="filled" /></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Celular" variant="filled" /></div>
                <div className="perfectCentered"><ButtonDashboard onClick={handlerRegistrar} variant="contained" color="#1ab187">Registrar</ButtonDashboard></div>
            </div>
        </div>
    )

}


export default Register