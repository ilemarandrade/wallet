import React from 'react';
import "../App.css";
import {styles, useStylesComplete} from "../theme/theme.js"
import TextField from '@material-ui/core/TextField';
import {ButtonDashboard} from "../theme/theme.js";
 
function Pagar(){
    const classes =useStylesComplete();
    return(
    <div className="perfectCentered column">
        <h1>Pagar</h1>
        <div>
            <div  style={styles.styleContainerDivAction}>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Email" variant="filled"/></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Monto de Pago" variant="filled" /></div>
                <div style={styles.marginBottom}><TextField classes={{root: classes.root}} id="filled-basic" label="Concepto de Pago" variant="filled" /></div>
                <div className="perfectCentered"><ButtonDashboard variant="contained" color="#1ab187">Pagar</ButtonDashboard></div>
            </div>
        </div>
      
    </div>
    )
}

export default Pagar
