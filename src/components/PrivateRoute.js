import React from 'react'
import { Route, useHistory } from 'react-router-dom'

const PrivateRoute = props => {
    const [isLoading, setIsLoading] = React.useState(true)
    const history = useHistory()
    React.useEffect(() => {
        JSON.parse(localStorage.getItem("userLogin"))===null ? 
        setTimeout(() => {history.push('/')}, 5000):setIsLoading(false)         



    },[history])

    return (
    
        <>
          {isLoading ? (
            <div style={{color:"white"}}>Cargando...</div>
          ) : (
            <Route {...props}>{props.children}</Route>
          )}
        </>
      )
}


export default PrivateRoute