//@ts-nocheck
import React from 'react'
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Component/Login";
import Registration from "./Component/Registration";
import HomePage from "./Component/HomePage";

const App = () => (
  <ChakraProvider theme={theme}>
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
  </ChakraProvider>
)

export default App
