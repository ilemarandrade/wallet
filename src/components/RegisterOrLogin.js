import React, { useState } from 'react';
import "./RegisterOrLogin.css";
import Register from "./RegisterLoginLayout/Register.js"
import Login from "./RegisterLoginLayout/Login.js"




function RegisterOrLogin(){
    const [changeProcess,setchangeProcess]=useState(true);
    const typeProcess= changeProcess ? <Register/>:<Login />;
    const handlerTypeProcess=(e)=>{
        e.target.id==="Signup" && setchangeProcess(true)
        e.target.id!=="Signup" && setchangeProcess(false)
    }
return(
    <div id="registerOrLogin"className="perfectCentered">
        <h1>Billetera</h1>
        <div id="containerLogin">
            <div id="signUpOrLogin">
                <div id="Signup" className="divsignUpOrLogin perfectCentered" onClick={handlerTypeProcess} style={{background: changeProcess ? "#1ab187":"#435258"}}>
                    <p id="Signup">Sign up</p>
                </div>
                <div className="divsignUpOrLogin perfectCentered" onClick={handlerTypeProcess} style={{background: changeProcess ? "#435258":"#1ab187"}}>
                    <p>Login</p>
                </div>
            </div>
            <div>{typeProcess}</div>
        </div>
    </div>

)
}
export default RegisterOrLogin;