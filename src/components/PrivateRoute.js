import React from 'react'
import { Route, useHistory } from 'react-router-dom'

const PrivateRoute = props => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [usuario, setUsuario]=React.useState("")
    const history = useHistory()
    React.useEffect(() => {
        if(JSON.parse(localStorage.getItem("userLogin"))===null) { 
        setTimeout(() => {history.push('/')}, 5000)
        }
        else {
            setIsLoading(false)
            setUsuario(JSON.parse(localStorage.getItem("userLogin"))[0]["userOnline"])
        }         
           



    },[history])
    const cerrarSesion=()=>{
        history.push('/')
        localStorage.removeItem('userLogin');
    }

    return (
    
        <>
          {isLoading ? (
            <div style={{color:"white"}}>Cargando...</div>
          ) : (
          <Route {...props}><div style={stylesOfuserActived}>User: {usuario} <br></br><p onClick={cerrarSesion} style={pCerrarSesion}>CerrarSesion</p></div>{props.children}</Route>
          )}
        </>
      )
}

const stylesOfuserActived={
    background:"#1ab187",
    color:"white",
    width: "200px",
    textAlign: "center",
    padding: "1px 0",
    borderRadius: "5px 70px"
}
const pCerrarSesion={
    textDecoration:"underline",
    color:"#146f56",
    margin:"0px"
}

export default PrivateRoute