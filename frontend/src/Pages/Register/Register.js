import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
  FormText
} from "reactstrap";
import { withRouter } from "react-router-dom";

import "./Register.scss";
import LandingNavbar from "../../Components/Navbars/LandingNavbar";
import { auth } from "../../api";

const Register = props => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "4"
  });

  const [valid, setValid] = useState({
    username: true,
    email: true,
    password: true,
    firstName: true,
    lastName: true,
    role: true
  });

  const { username, email, password, firstName, lastName, role } = input;

  const handleInput = event => {
    // event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;

    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!username || !password || !firstName || !lastName) {
      if (!username) {
        setValid(prevValid => ({ ...prevValid, username: false }));
      }
      if (!firstName) {
        setValid(prevValid => ({ ...prevValid, firstName: false }));
      }
      if (!lastName) {
        setValid(prevValid => ({ ...prevValid, lastName: false }));
      }
      if (!password) {
        setValid(prevValid => ({ ...prevValid, password: false }));
      }
      return;
    } else {
      setValid({
        username: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true
      });

      auth.registration(input);

      setTimeout(() => {
        props.history.push("/login");
      }, 1250);
    }
  };

  return (
    <div className="Register-Page">
      <LandingNavbar />
      <div className="RegisterForm-Wrapper">
        <h2>register</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label size="sm" for="firstName">
                  first name
                </Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="John"
                  onChange={handleInput}
                  valid={firstName.length > 0}
                  invalid={!valid.firstName}
                />
                <FormFeedback invalid={"true"}>Field required</FormFeedback>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label size="sm" for="lastName">
                  last name
                </Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Smith"
                  onChange={handleInput}
                  valid={lastName.length > 0}
                  invalid={!valid.lastName}
                />
                <FormFeedback invalid={"true"}>Field required</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label size="sm" for="email">
              email
            </Label>
            <Input
              bsSize="sm"
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              onChange={handleInput}
              valid={emailRegex.test(email)}
              invalid={!valid.email}
            />
            <FormText>Optional</FormText>
            {/* <FormFeedback invalid={"true"}>Field required</FormFeedback> */}
          </FormGroup>
          <FormGroup>
            <Label size="sm" for="username">
              username
            </Label>
            <Input
              bsSize="sm"
              type="username"
              name="username"
              id="username"
              placeholder="username"
              onChange={handleInput}
              valid={username.length >= 4}
              invalid={!valid.username}
            />
            <FormFeedback invalid={"true"}>Field required</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label size="sm" for="password">
              password
            </Label>
            <Input
              bsSize="sm"
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={handleInput}
              valid={password.length > 0}
              invalid={!valid.password}
            />
            <FormFeedback invalid={"true"}>Field required</FormFeedback>
          </FormGroup>
          <FormGroup tag="fieldset">
            <Label>Account type:</Label>
            <FormGroup check>
              <Label check>
                <Input
                  value="4"
                  type="radio"
                  name="role"
                  onChange={handleInput}
                  checked={role == "4"}
                />{" "}
                Individual
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  value="1"
                  type="radio"
                  name="role"
                  onChange={handleInput}
                  checked={role == "1"}
                />{" "}
                Company
              </Label>
            </FormGroup>
          </FormGroup>
          <Button type="submit" onClick={handleSubmit} color="primary">
            register
          </Button>
        </Form>
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
