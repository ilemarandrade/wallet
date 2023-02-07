import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../constants/routes";
import Init from "../pages/Init";
import Dashboard from "../pages/Dashboard";
import Recharge from "../pages/Recharge";
import Pay from "../pages/Pay";
import Movements from "../pages/Movements";
import PrivateRoute from "../components/PrivateRoute";
import Loading from "../components/Loading";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import styled from "styled-components";
const Container = styled.div`
  ${({ theme }) => `
  min-height: calc(100vh - 72px);
  margin-bottom: 48px;
  padding: 48px 0px;

  ${theme.breakpoints.down("sm")}{
    padding-top: 10vh;
  }

`}
`;

export const privateRoutes = [
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
    Component: Movements,
    path: routes.MOVEMENTS,
  },
];
const Routes = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return (
    <Container sx={{ minHeight: "calc(100vh - 72px)", mb: 6, paddingY: 6 }}>
      <Loading open={isFetching || isMutating} />
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
    </Container>
  );
};

export default Routes;
