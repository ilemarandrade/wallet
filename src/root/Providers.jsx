import React from "react";
import { ThemeProvider } from "styled-components";
import customTheme from "./theme";

const Providers = ({ children }) => (
  <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
);

export default Providers;
