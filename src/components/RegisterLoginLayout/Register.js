import React, { useState } from 'react';
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
                <div style={marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Documento" variant="filled"/></div>
                <div style={marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Nombres" variant="filled"/></div>
                <div style={marginBottom}><TextField classes={{root: classes.root}}id="filled-basic" label="Email" variant="filled" /></div>
                <div style={marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Celular" variant="filled" /></div>
                <div className="perfectCentered"><Button onClick={handlerRegistrar} variant="contained" color="#1ab187">Registrar</Button></div>
            </div>
        </div>
    )

}


export default Register