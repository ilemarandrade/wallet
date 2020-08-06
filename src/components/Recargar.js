import React from 'react';
import "../App.css";
import {styles, useStylesComplete} from "../theme/theme.js"
import TextField from '@material-ui/core/TextField';
import {ButtonDashboard} from "../theme/theme.js";


function Recargar(){
    const classes =useStylesComplete();
    return(
    <div className="perfectCentered column">
        <h1>Recargar</h1>
        <div>
            <div  style={styles.styleContainerDivAction}>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Documento" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Celular" variant="filled" /></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Valor de Recarga" variant="filled" /></div>
                <div className="perfectCentered"><ButtonDashboard variant="contained" color="#1ab187">Recargar</ButtonDashboard></div>
            </div>
        </div>
      
    </div>
    )
}

export default Recargar;
