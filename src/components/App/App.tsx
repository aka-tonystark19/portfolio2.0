import React from "react";
import Hero from "../Hero";
import "./style.css";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, makeStyles, Container } from "@material-ui/core";
import Header from "../Header";
import About from "../About";
import Projects from "../Projects";
import Contact from "../Contact";

const useStyles = makeStyles(theme => ({
  main: {
    background: "#f6f9fc"
  }
}));

export default function App() {
  const classes = useStyles({});

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        <Container>
          <Header />
          <Hero />
          <About />
          <Projects />
          <Contact />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "14px",
        backgroundColor: "black"
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: "#2a5bd7",
        color: "white",
        fontFamily: "Consolas"
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#fff"
      }
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600
  }
});
