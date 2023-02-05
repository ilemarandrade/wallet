import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routes from "../constants/routes";
import Init from "../pages/Init";
import Dashboard from "../pages/Dashboard";
import Recharge from "../pages/Recharge";
import Pay from "../pages/Pay";
import PrivateRoute from "../components/PrivateRoute";
import { Box } from "@material-ui/core";

const privateRoutes = [
  {
    Component: Dashboard,
    path: routes.DASHBOARD,
  },
  {
    Component: Recharge,
    path: routes.RECHARGE,
  },
  {
    Component: Pay,
    path: routes.PAY,
  },
];
const Routes = () => (
  <Box sx={{ minHeight: "calc(100vh - 72px)", mb: 6, paddingY: 6 }}>
    <Router>
      <Switch>
        {privateRoutes.map(({ path, Component }) => (
          <PrivateRoute exact path={path}>
            <Component />
          </PrivateRoute>
        ))}
        <Route path={routes.INIT}>
          <Init />
        </Route>
        <Redirect to={routes.INIT} />
      </Switch>
    </Router>
  </Box>
);

export default Routes;
