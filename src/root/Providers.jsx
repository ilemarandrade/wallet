import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { ThemeProvider } from "styled-components";
import customTheme from "./theme";

const Providers = ({ children }) => (
  <MuiThemeProvider theme={customTheme}>
    <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
  </MuiThemeProvider>
);

export default Providers;
