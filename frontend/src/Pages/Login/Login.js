import React, { useState, useEffect } from "react";
import {
  FormFeedback,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { BASE_URL } from "../../utils";

import "./Login.scss";
import LandingNavbar from "../../Components/Navbars/LandingNavbar";

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
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="username"
                name="username"
                id="exampleUsername"
                placeholder="username"
                value={input.username}
                onChange={handleInput}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={input.password}
                onChange={handleInput}
              />
            </FormGroup>
          </Col>
          <Button onClick={login}>Submit</Button>

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
