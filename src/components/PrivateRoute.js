import { Box, ButtonBase, Grid, IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import routes from "../constants/routes";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useStateUser } from "../providers/UserProvider";
import { useTranslation } from "react-i18next";
import Language from "./Language";

const ContainerButtons = styled(Grid)`
  position: relative;
  top: -40px;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    top: -9vh;
  }
`;

const ButtonStyles = styled.div`
  background: #1ab187;
  color: white;
  width: 200px;
  text-align: center;
  padding: 1px 0;
  border-radius: 5px 70px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & p {
    margin: 0px;
  }
`;

const NameStyles = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
`;
const CloseSessionStyles = styled(ButtonBase)`
  text-decoration: underline;
  color: #146f56;
  margin: 0px;
`;

const ArrowBackStyles = styled(IconButton)(
  ({ show }) => `
  visibility: ${show ? "" : "hidden"};
  & svg {
    fill: white;
    font-size: 2rem;
  }
  padding: 0px 12px;
`
);
const PrivateRoute = (props) => {
  const { logout, isLogged, profile } = useStateUser();
  const history = useHistory();
  const { pathname } = useLocation();
  const notDashboard = pathname !== routes.DASHBOARD;
  const { t } = useTranslation();
  const backToDashboard = () => {
    history.push(routes.DASHBOARD);
  };
  useEffect(() => {
    if (!isLogged) {
      history.push(routes.LOGIN);
    }
  }, [history, isLogged]);

  if (!isLogged) {
    return null;
  }

  return (
    <Route {...props}>
      <ContainerButtons container>
        <ArrowBackStyles show={notDashboard} onClick={backToDashboard}>
          <KeyboardBackspaceIcon size="large" />
        </ArrowBackStyles>
        <Box sx={{ display: "flex" }}>
          <Language />
          <ButtonStyles>
            {profile?.name && (
              <NameStyles>{`${t("user")}: ${profile.name}`} </NameStyles>
            )}
            <CloseSessionStyles onClick={logout}>
              {t("logout").toUpperCase()}
            </CloseSessionStyles>
          </ButtonStyles>
        </Box>
      </ContainerButtons>
      {props.children}
    </Route>
  );
};

export default PrivateRoute;
