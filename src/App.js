import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import "./App.css";
import Header from "./features/Header/Container/Header";
import Home from "./features/Home/Container/Home";
import Tweets from "./features/Tweets/Container/Tweets";
import Users from "./features/Users/Container/Users";
import Login from "./features/Login-Register/Container/Login";
import Register from "./features/Login-Register/Container/Register";
import ForgotPassword from "./features/Login-Register/Container/ForgotPassword";
import Error from "./features/Error/Container/Error";
import Footer from "./features/Footer/Container/Footer";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"></Redirect>
          </Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/user-tweet" component={Tweets}></Route>
          <Route exact path="/users" component={Users}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/forgotPass" component={ForgotPassword}></Route>
          <Route exact path="*" component={Error}></Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
