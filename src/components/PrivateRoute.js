import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { publicRoutes } from "../constants/routes";
import { useStateUser } from "../providers/UserProvider";

const PrivateRoute = (props) => {
  const { isLogged } = useStateUser();
  const history = useHistory();

  useEffect(() => {
    if (!isLogged) {
      history.push(publicRoutes.LOGIN);
    }
  }, [history, isLogged]);

  if (!isLogged) {
    return null;
  }

  return <Route {...props}>{props.children}</Route>;
};

export default PrivateRoute;
