import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../constants/routes";
import Init from "../pages/Init";
import Dashboard from "../pages/Dashboard";
import Recharge from "../pages/Recharge";
import Pay from "../pages/Pay";
import BalanceInquiry from "../pages/BalanceInquiry";
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
  {
    Component: BalanceInquiry,
    path: routes.BALANCEINQUIRY,
  },
];
const Routes = () => (
  <Router>
    <Switch>
      <Box sx={{ minHeight: "calc(100vh - 72px)", mb: 6, paddingY: 6 }}>
        <Route exact path={routes.INIT}>
          <Init />
        </Route>
        {privateRoutes.map(({ path, Component }) => (
          <PrivateRoute exact path={path}>
            <Component />
          </PrivateRoute>
        ))}
      </Box>
    </Switch>
  </Router>
);

export default Routes;
