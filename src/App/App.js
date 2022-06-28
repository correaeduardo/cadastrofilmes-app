import React from 'react';
import './App.css';
import { Container, makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "../components/Header";
import Filme from "../pages/Filme";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#457ab7",
      light: '#3c44b126'
    },
    secondary: {
      main: "#457ab7",
      light: '#f8324526'
    },
    background: {
      default: "#f2f2f2"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>

            <Container>
                <Header />
                <Filme />
            </Container>

        <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
