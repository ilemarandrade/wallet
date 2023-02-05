import { ButtonBase, Grid, IconButton } from "@material-ui/core";
import React from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import routes from "../constants/routes";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const ContainerButtons = styled(Grid)`
  position: relative;
  top: -40px;
  justify-content: space-between;
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
  const history = useHistory();
  const { pathname } = useLocation();
  const notDashboard = pathname !== routes.DASHBOARD;
  const cerrarSesion = () => {
    history.push("/");
  };
  const backToDashboard = () => {
    history.push("/dashboard");
  };
  return (
    <Route {...props}>
      <ContainerButtons container>
        <ArrowBackStyles show={notDashboard} onClick={backToDashboard}>
          <KeyboardBackspaceIcon size="large" />
        </ArrowBackStyles>
        <ButtonStyles>
          <NameStyles>User: Ilemar Andrade</NameStyles>
          <CloseSessionStyles onClick={cerrarSesion}>
            Cerrar Sesion
          </CloseSessionStyles>
        </ButtonStyles>
      </ContainerButtons>
      {props.children}
    </Route>
  );
};

export default PrivateRoute;
