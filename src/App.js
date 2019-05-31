import React, { Component } from "react";

import HomePage from "./Pages/HomePage";
import OrderPage from "./Pages/OrderPage";

import { BrowserRouter as Router, Route } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.css';

export default () => (
  <Router>
    <Route path="/" exact render={({ history }) => <HomePage history={history} /> } />
    <Route path="/order" exact render={({ history }) => <OrderPage history={history} /> } />
  </Router>  
);
