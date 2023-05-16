import React, { useEffect } from "react";
import Register from "./Register.js";
import Login from "./Login.js";
import styled from "styled-components";
import { ButtonBase } from "@material-ui/core";
import { Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import { publicRoutes } from "../constants/routes";
import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";
import ForgotPassword from "./ForgotPassword.js";

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
  const { t } = useTranslation();
  const isForgotPassword = pathname === publicRoutes.FORGOT_PASSWORD;

  useEffect(() => {
    if (pathname === publicRoutes.INIT) {
      history.push(publicRoutes.LOGIN);
    }
  }, [history, pathname]);

  return (
    <MainLayout title={t("main_title")}>
      {!isForgotPassword && (
        <SignInSignInButtons>
          <ButtonStyles
            className="perfectCentered"
            isActive={pathname === publicRoutes.SIGNUP}
            component={Link}
            to={publicRoutes.SIGNUP}
          >
            {t("forms.titles.signup")}
          </ButtonStyles>
          <ButtonStyles
            className="perfectCentered"
            isActive={pathname === publicRoutes.LOGIN}
            component={Link}
            to={publicRoutes.LOGIN}
          >
            {t("forms.titles.login")}
          </ButtonStyles>
        </SignInSignInButtons>
      )}
      <Switch>
        <Route path={publicRoutes.SIGNUP}>
          <Register />
        </Route>
        <Route path={publicRoutes.LOGIN}>
          <Login />
        </Route>
        <Route path={publicRoutes.FORGOT_PASSWORD}>
          <ForgotPassword />
        </Route>
      </Switch>
    </MainLayout>
  );
}
export default RegisterOrLogin;
