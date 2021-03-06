import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  InputGroupAddon,
  InputGroup,
  InputGroupText
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../api/index";

import "./Login.scss";
import LandingNavbar from "../../Components/Navbars/LandingNavbar";
import { checkToken } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const Login = props => {
  const [input, setInput] = useState({
    username: "",
    password: ""
  });
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (checkToken()) {
      props.history.push("/projects");
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
        props.history.push("/projects");
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
              <Label>Password:</Label>
              <InputGroup>
                <InputGroupAddon addonType="append">
                  <InputGroupText
                    onMouseDown={() => setIsVisible(true)}
                    onMouseUp={() => setIsVisible(false)}
                    className="EditProfile-IconVisible"
                  >
                    <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  value={input.password}
                  onChange={handleInput}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                value={isMember}
                onClick={() => setIsMember(!isMember)}
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
