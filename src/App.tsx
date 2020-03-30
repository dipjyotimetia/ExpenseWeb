import React from 'react'
import {
  CSSReset,
  ThemeProvider,
  theme,
} from "@chakra-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Component/Login";
import Registration from "./Component/Registration";
import HomePage from "./Component/HomePage";

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/registration'>
          <Registration />
        </Route>
        <Route exact path='/homepage'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
)

export default App
