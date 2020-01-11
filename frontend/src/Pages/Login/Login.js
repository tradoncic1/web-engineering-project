import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../api/index";

import "./Login.scss";
import LandingNavbar from "../../Components/Navbars/LandingNavbar";

const Login = props => {
  const [input, setInput] = useState({
    username: "",
    password: ""
  });
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      props.history.push("/home");
    }
  }, []);

  const handleInput = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setInvalidUsername(false);
    setInvalidPassword(false);
    setIsLoading(true);

    let type = "";
    if (isMember) type = "member";
    else type = "user";

    await auth
      .login(type, input)
      .then(res => {
        localStorage.setItem("jwt", res.data.jwt);
        props.history.push("/home");
      })
      .catch(error => {
        if (error && error.response) {
          if (error.response.status === 403) {
            if (error.response.data.message === "username") {
              setInvalidUsername(true);
            } else if (error.response.data.message === "password") {
              setInvalidPassword(true);
            }
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <div className="Login-Page">
      <LandingNavbar />
      <div className="LoginForm-Wrapper">
        <h2>login</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <Col>
            <FormGroup>
              <Label for="username">username</Label>
              <Input
                type="username"
                name="username"
                id="username"
                placeholder="username"
                value={input.username}
                onChange={handleInput}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={input.password}
                onChange={handleInput}
              />
            </FormGroup>
          </Col>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                value={isMember}
                onChange={e => setIsMember(e.target.value)}
              />
              Login as Company member
            </Label>
          </FormGroup>
          <Button
            disabled={isLoading}
            type="submit"
            onClick={handleSubmit}
            color="primary"
          >
            {isLoading ? <Spinner size="sm" /> : "Submit"}
          </Button>
          {invalidUsername && (
            <div className="Login-Invalid">That username doesn't exist.</div>
          )}
          {invalidPassword && (
            <div className="Login-Invalid">
              That password doesn't match that username.
            </div>
          )}
          <div>
            Don't have an account?
            <br />
            <Link to="/register">Register here!</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(Login);
