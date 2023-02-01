import React, { useState } from "react";
import Register from "./Register.js";
import Login from "./Login.js";
import styled from "styled-components";
import { Box, ButtonBase, Typography } from "@material-ui/core";

const ContainerForm = styled.div`
  ${({ theme }) => `
    min-width: 365px;
    background: #24303c;
    padding: 5vh;
    width: 20vw;
    margin-top: 24px;
    ${theme.breakpoints.down("xs")}{
      min-width: 96vw;
      margin: auto;
    }
  `}
`;

const SignInSignInButtons = styled.div`
  display: flex;
  height: 40px;
`;

const ButtonStyles = styled(ButtonBase)`
  ${({ isActive }) => `
      background: ${isActive ? "#1ab187" : "#435258"};
      height: 100%;
      width: 50%;
      color: ${isActive ? "white" : "#b1b1b1"};
      font-weight: 600
    `}
`;

function RegisterOrLogin() {
  const [typeProcess, setTypeProcess] = useState(true);
  const form = !typeProcess ? <Register /> : <Login />;
  const handlerTypeProcess = () => setTypeProcess(!typeProcess);

  return (
    <Box
      sx={{
        flexDirection: "column",
        "& h1": { color: "white", fontWeight: 600 },
      }}
      className="perfectCentered"
    >
      <Typography variant="h4" component="h1">
        Billetera
      </Typography>
      <ContainerForm>
        <SignInSignInButtons>
          <ButtonStyles
            className="perfectCentered"
            onClick={handlerTypeProcess}
            isActive={!typeProcess}
          >
            Sign up
          </ButtonStyles>
          <ButtonStyles
            className="perfectCentered"
            onClick={handlerTypeProcess}
            isActive={typeProcess}
          >
            Login
          </ButtonStyles>
        </SignInSignInButtons>
        <div>{form}</div>
      </ContainerForm>
    </Box>
  );
}
export default RegisterOrLogin;
