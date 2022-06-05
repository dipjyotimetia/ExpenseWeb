//@ts-nocheck
import React, { Fragment } from 'react'
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Registration from "./Component/Registration";
import HomePage from "./Component/HomePage";
import PrivateRoute from "./Component/PrivateRoute";

const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/registration' element={<Registration />} />
          <Route exact path='/homepage' element={<HomePage />} />
        </Routes>
      </Fragment>
    </Router>
  </ChakraProvider>
)

export default App
