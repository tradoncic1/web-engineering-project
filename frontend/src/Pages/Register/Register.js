import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";

import "./Register.scss";
import LandingNavbar from "../../Components/Navbars/LandingNavbar";

const Register = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const handleInput = event => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });

    console.log(event.target.value);
  };

  return (
    <div className="Register-Page">
      <LandingNavbar />
      <div className="RegisterForm-Wrapper">
        <h2>register</h2>
        <Form>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label size="sm" for="firstName">
                  first name
                </Label>
                <Input
                  size="sm"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="John"
                  onChange={handleInput}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label size="sm" for="lastName">
                  last name
                </Label>
                <Input
                  size="sm"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Smith"
                  onChange={handleInput}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label size="sm" for="email">
              email
            </Label>
            <Input
              size="sm"
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              onChange={handleInput}
            />
          </FormGroup>
          <FormGroup>
            <Label size="sm" for="username">
              username
            </Label>
            <Input
              size="sm"
              type="username"
              name="username"
              id="username"
              placeholder="username"
              onChange={handleInput}
            />
          </FormGroup>
          <FormGroup>
            <Label size="sm" for="password">
              password
            </Label>
            <Input
              size="sm"
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={handleInput}
            />
          </FormGroup>
        </Form>
        <Button color="primary">register</Button>
        <div>
          Already have an account?
          <br />
          <Link to="/login">Login here!</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
