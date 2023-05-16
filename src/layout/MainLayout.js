import React from "react";
import styled from "styled-components";
import { Box, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { privateRoutes } from "../constants/routes";

export const ContainerMain = styled.div`
  ${({ theme, fullWidth }) => `
    min-width: 365px;
    background: #24303c;
    padding: 5vh;
    width: ${fullWidth ? "75vw" : "20vw"};
    margin-top: 24px;
    ${theme.breakpoints.down("xs")}{
      min-width: 90vw;
      margin: 12px auto;
    }
  `}
`;

function MainLayout({ title, children, className }) {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        flexDirection: "column",
        "& h1": { color: "white", fontWeight: 600 },
      }}
      className={`${className} perfectCentered`}
    >
      <Typography variant="h4" component="h1" align="center">
        {title}
      </Typography>
      <ContainerMain fullWidth={pathname === privateRoutes.MOVEMENTS}>
        {children}
      </ContainerMain>
    </Box>
  );
}
export default MainLayout;
