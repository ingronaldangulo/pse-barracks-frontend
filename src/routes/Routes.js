import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "../pages/Login";
import Home from '../pages/Home';
import Register from '../pages/Register';

function Routes() {
  return (
   <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/register" component={Register}/>
      </Switch>
   </BrowserRouter>
  );
}

export default Routes;
