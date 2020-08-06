import React from 'react';
import "../App.css";
import {styles, useStylesComplete} from "../theme/theme.js"
import TextField from '@material-ui/core/TextField';
import {ButtonDashboard} from "../theme/theme.js";

function Consulta(){
    const classes =useStylesComplete();
    return(
    <div className="perfectCentered column">
        <h1>Consulta de Saldo</h1>
        <div>
            <div  style={styles.styleContainerDivAction}>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Email" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Numero Celular" variant="filled" /></div>
                <div className="perfectCentered"><ButtonDashboard variant="contained" color="#1ab187">Consultar</ButtonDashboard></div>
            </div>
        </div>
      
    </div>
    )
}

export default Consulta
