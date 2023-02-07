import { createTheme } from "@material-ui/core/styles";

const customTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        height: 56,
      },
      containedPrimary: {
        fontWeight: 600,
      },
    },
    MuiTextField: {
      root: {
        marginBottom: 16,
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: "white",
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: "white",
        "&.Mui-focused, &:hover": {
          backgroundColor: "white",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#1ab187",
      contrastText: "white",
    },
  },
});

export default customTheme;
