import React, { useState, useCallback, useEffect } from "react";
import { withRouter } from "react-router";
import "./Teams.scss";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Button
} from "reactstrap";
import { company } from "../../api";
import { parseJwt } from "../../utils";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import TeamCard from "../../Components/TeamCard/TeamCard";

const Teams = props => {
  const [memberInput, setMemberInput] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });
  const [membersList, setMembersList] = useState([]);
  const [reloadList, setReloadList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const fetchMembers = async () => {
    setIsLoading(true);
    await company
      .search(parseJwt(localStorage.getItem("jwt")).username)
      .then(res => setMembersList(res.data));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, [reloadList]);

  const handleMemberInput = useCallback(
    event => {
      const name = event.target.name;
      const value = event.target.value;

      setMemberInput(prevInput => ({ ...prevInput, [name]: value }));
    },
    [memberInput]
  );

  const handleUserSubmit = async () => {
    let memberBody = memberInput;
    if (memberBody.username.length === 0) {
      memberBody.username =
        memberBody.firstName.toLowerCase().substring(0, 1) +
        memberBody.lastName.toLowerCase();
    }

    if (memberBody.password.length === 0) memberBody.password = "12345678";

    memberBody.created = Date.now();

    company
      .create(parseJwt(localStorage.getItem("jwt")).username, memberBody)
      .then(res => {
        setMemberInput({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: ""
        });

        setReloadList(!reloadList);
      })
      .catch(e => {
        toast.warn(
          `A user with that ${e.response.data.message} already exists`
        );
        setMemberInput(prevInput => ({ ...prevInput, password: "" }));
      });
  };

  return (
    <div className="Teams-Page">
      <Row>
        <Col className="Teams-PageCol" md={6}>
          <h3 className="Teams-PageTitle">Add a member</h3>
          <Form onSubmit={handleUserSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Member first name:</Label>
                  <Input
                    name="firstName"
                    value={memberInput.firstName}
                    placeholder="eg. 'John'"
                    onChange={handleMemberInput}
                    valid={memberInput.firstName.length > 0}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Member last name:</Label>
                  <Input
                    name="lastName"
                    value={memberInput.lastName}
                    placeholder="eg. 'Smith'"
                    onChange={handleMemberInput}
                    valid={memberInput.lastName.length > 0}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label>Member username:</Label>
              <Input
                name="username"
                value={memberInput.username}
                placeholder="eg. 'username'"
                onChange={handleMemberInput}
                valid={memberInput.username.length > 0}
              />
            </FormGroup>
            <FormGroup>
              <Label>Member email:</Label>
              <Input
                name="email"
                value={memberInput.email}
                placeholder="eg. 'example@domain.com'"
                onChange={handleMemberInput}
                valid={memberInput.email.length > 0}
              />
            </FormGroup>
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
                  value={memberInput.password}
                  onChange={handleMemberInput}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Button
                disabled={
                  !memberInput.firstName ||
                  !memberInput.lastName ||
                  !memberInput.email
                }
                color="primary"
                onClick={handleUserSubmit}
              >
                Add User
              </Button>
            </FormGroup>
          </Form>
        </Col>
        <Col className="Teams-PageCol" md={6}>
          <h3 className="Teams-PageTitle">Team members</h3>
          {membersList.map((member, index) => {
            return (
              <TeamCard
                key={index}
                firstName={member.firstName}
                lastName={member.lastName}
                username={member.username}
                email={member.email}
                created={member.created}
              />
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default Teams;
