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
  const loginComplete=()=>{
    history.push("/dashboard");
  }

    return(
        <div>
            <h2 style={{textAlign:"center",color:"white"}}>Login</h2>
            <div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Documento" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Email" variant="filled"/></div>
            </div>
            <div className="perfectCentered"><ButtonDashboard onClick={loginComplete} variant="contained" color="#1ab187">Entrar</ButtonDashboard></div>      
        </div>
    )

}


export default Login