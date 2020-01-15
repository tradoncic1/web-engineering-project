import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingNavbar from "./Components/Navbars/LandingNavbar";
import MainNavbar from "./Components/Navbars/MainNavbar";
import Projects from "./Pages/Projects/Projects";
import Register from "./Pages/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import "./App.scss";
import Tasks from "./Pages/Tasks/Tasks";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Teams from "./Pages/Teams/Teams";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <MainNavbar />
        <LandingNavbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/tasks/:projectKey" component={Tasks} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/editProfile" component={EditProfile} />
          <Route exact path="/teams" component={Teams} />
          <Route component={Projects} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
