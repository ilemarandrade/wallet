import { MuiThemeProvider } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ThemeProvider } from "styled-components";
import customTheme from "./theme";
import UserProvider from "../providers/UserProvider";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
const Providers = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MuiThemeProvider theme={customTheme}>
          <ThemeProvider theme={customTheme}>
            <UserProvider>
              {children}
              <Toaster
                toastOptions={{
                  success: {
                    duration: 4000,
                  },
                }}
              />
            </UserProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default Providers;
