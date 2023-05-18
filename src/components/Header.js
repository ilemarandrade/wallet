import React, { useMemo } from "react";
import { Box, ButtonBase, Grid, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { useStateUser } from "../providers/UserProvider";
import { useLocation, useHistory } from "react-router-dom";
import { privateRoutes } from "../constants/routes";
import { useTranslation } from "react-i18next";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Language from "./Language";

const HeaderStyles = styled(Grid)(
  ({ isBackIconVisible }) => `
    width: 98vw;
    position: absolute;
    top: 1vh;
    justify-content: ${isBackIconVisible ? "space-between" : "flex-end"};
    ${({ theme }) => theme.breakpoints.down("sm")} {
      }
  `
);

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
  () => `
  & svg {
    fill: white;
    font-size: 2rem;
  }
  padding: 0px 12px;
`
);

const Header = () => {
  const history = useHistory();
  const { logout, profile, isLogged } = useStateUser();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const whereCanShowBackIcon = useMemo(
    () => [privateRoutes.MOVEMENTS, privateRoutes.RECHARGE, privateRoutes.PAY],
    []
  );

  const shouldShowBackIcon = whereCanShowBackIcon.includes(pathname);

  const backToDashboard = () => {
    history.push(privateRoutes.DASHBOARD);
  };

  return (
    <HeaderStyles container isBackIconVisible={shouldShowBackIcon}>
      {shouldShowBackIcon && (
        <ArrowBackStyles onClick={backToDashboard}>
          <KeyboardBackspaceIcon size="large" />
        </ArrowBackStyles>
      )}
      <Box sx={{ display: "flex" }}>
        <Language />
        {isLogged && profile && (
          <ButtonStyles>
            <NameStyles>{`${t("user")}: ${profile.name}`} </NameStyles>
            <CloseSessionStyles onClick={logout}>
              {t("logout").toUpperCase()}
            </CloseSessionStyles>
          </ButtonStyles>
        )}
      </Box>
    </HeaderStyles>
  );
};

export default Header;
