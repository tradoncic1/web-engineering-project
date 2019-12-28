import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import "./App.scss";
import LandingNavbar from "./Components/Navbars/LandingNavbar";
import MainNavbar from "./Components/Navbars/MainNavbar";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
