import React from "react";
import styled from "styled-components";
import { Box, Typography } from "@material-ui/core";

export const ContainerMain = styled.div`
  ${({ theme }) => `
    min-width: 365px;
    background: #24303c;
    padding: 5vh;
    width: 20vw;
    margin-top: 24px;
    ${theme.breakpoints.down("xs")}{
      min-width: 90vw;
      margin: 12px auto;
    }
  `}
`;

function MainLayout({ title, children }) {
  return (
    <Box
      sx={{
        flexDirection: "column",
        "& h1": { color: "white", fontWeight: 600 },
      }}
      className="perfectCentered"
    >
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <ContainerMain>{children}</ContainerMain>
    </Box>
  );
}
export default MainLayout;
