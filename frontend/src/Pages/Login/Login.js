import React, { useState } from "react";
import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import LandingNavbar from "../../Components/Navbars/LandingNavbar";
import { auth } from "../../api/index";

import "./Login.scss";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: ""
  });

  const handleInput = event => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const loginResponse = await auth.login(input);
    console.log(loginResponse.data);
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
          <Button type="submit" onClick={handleSubmit} color="primary">
            Submit
          </Button>
          <br />
          <br />
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

export default Login;
