import React, { useEffect, useState } from "react";
import Register from "./Register.js";
import Login from "./Login.js";
import styled from "styled-components";
import { ButtonBase } from "@material-ui/core";
import { Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import routes from "../constants/routes.js";
import MainLayout from "../layout/MainLayout";

const SignInSignInButtons = styled.div`
  display: flex;
  height: 40px;
`;

const ButtonStyles = styled(ButtonBase)`
  ${({ isActive }) => `
      background-color: ${isActive ? "#1ab187" : "#435258"};
      height: 100%;
      width: 50%;
      color: ${isActive ? "white" : "#b1b1b1"};
      font-weight: 600
    `}
`;

function RegisterOrLogin() {
  const { pathname } = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (pathname === routes.INIT) {
      history.push(routes.LOGIN);
    }
  }, []);
  return (
    <MainLayout title="Billetera">
      <SignInSignInButtons>
        <ButtonStyles
          className="perfectCentered"
          isActive={pathname === routes.SIGNUP}
          component={Link}
          to={routes.SIGNUP}
        >
          Sign up
        </ButtonStyles>
        <ButtonStyles
          className="perfectCentered"
          isActive={pathname === routes.LOGIN}
          component={Link}
          to={routes.LOGIN}
        >
          Login
        </ButtonStyles>
      </SignInSignInButtons>
      <Switch>
        <Route path={routes.SIGNUP}>
          <Register />
        </Route>
        <Route path={routes.LOGIN}>
          <Login />
        </Route>
      </Switch>
    </MainLayout>
  );
}
export default RegisterOrLogin;
