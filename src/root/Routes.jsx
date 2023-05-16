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
import Language from "../components/Language";
import { useStateUser } from "../providers/UserProvider";

const Container = styled.div`
  ${({ theme }) => `
  min-height: calc(100vh - 72px);
  margin-bottom: 48px;
  padding: 48px 0px;
  position: relative;
  
  ${theme.breakpoints.down("sm")}{
    min-height: calc(100vh - 24px);
    padding-top: 10vh;
    margin-bottom: 0px;
  }
`}
`;

const LanguageStyles = styled(Language)`
  position: absolute;
  top: 0px;
  right: 10px;
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
  const { isLogged } = useStateUser();

  return (
    <Container sx={{ mb: 6, paddingY: 6 }}>
      {!isLogged && <LanguageStyles />}
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
    </Container>
  );
};

export default Routes;
