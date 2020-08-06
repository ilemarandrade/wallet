import React, { useState } from 'react';
import '../../App.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import "../../App.css"


const useStylesComplete = makeStyles({
    root: {
      background: 'white',
      width: "100%"
    }
  });
  const marginBottom={marginBottom:"5%"}


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
                <div style={marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Documento" variant="filled"/></div>
                <div style={marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Email" variant="filled"/></div>
            </div>
            <div className="perfectCentered">< Button onClick={loginComplete} variant="contained" color="#1ab187">Entrar</Button></div>      
        </div>
    )

}


export default Login