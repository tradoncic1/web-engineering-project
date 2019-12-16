import React, { useState } from "react";
import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { BASE_URL } from "../../utils";

import "./Login.scss";
import LandingNavbar from "../../Components/Navbars/LandingNavbar";
import { Link } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: ""
  });
  const [exists, setExists] = useState(false);

  const handleInput = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const login = async () => {
    try {
      setExists(false);
      const loginResponse = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: input.username,
          password: input.password
        })
      });
      const content = await loginResponse.json();
      setExists(true);
      console.log(content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login-Page">
      <LandingNavbar />
      <div className="LoginForm-Wrapper">
        <h2>login</h2>
        <Form className="form">
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
          <Button color="primary" onClick={login}>
            Submit
          </Button>
          <br />
          <br />
          <div>
            Don't have an account?
            <br />
            <Link to="/register">Register here!</Link>
          </div>
          <div
            className="exists"
            style={exists ? { height: "24px" } : { height: "0" }}
          >
            User exists in the database!
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
