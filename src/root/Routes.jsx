import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../constants/routes";
import Init from "../pages/Init";
import Dashboard from "../pages/Dashboard";
import Recharge from "../pages/Recharge";
import Pay from "../pages/Pay";
import Movements from "../pages/Movements";
import PrivateRoute from "../components/PrivateRoute";
import Loading from "../components/Loading";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Header from "../components/Header";

const RootRoutes = styled(Grid)`
  min-height: calc(100vh - 48px);
  margin-bottom: 24px;
  padding-top: 15vh;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding-top: 18vh;
  }
`;

export const privateViews = [
  {
    Component: Recharge,
    path: privateRoutes.RECHARGE,
  },
  {
    Component: Pay,
    path: privateRoutes.PAY,
  },
  {
    Component: Movements,
    path: privateRoutes.MOVEMENTS,
  },
  {
    Component: Dashboard,
    path: privateRoutes.DASHBOARD,
  },
];

const Routes = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <RootRoutes container justifyContent="center" alignContent="flex-start">
      <Header />
      <Loading open={!!isFetching || !!isMutating} />
      <Switch>
        {privateViews.map(({ path, Component }) => (
          <PrivateRoute exact path={path} key={path}>
            <Component />
          </PrivateRoute>
        ))}
        <Route path={publicRoutes.INIT}>
          <Init />
        </Route>
        <Redirect to={publicRoutes.INIT} />
      </Switch>
    </RootRoutes>
  );
};

export default Routes;
