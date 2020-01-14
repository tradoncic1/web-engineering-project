import React, { useEffect, useState } from "react";
import "./EditProfile.scss";
import { withRouter } from "react-router";
import { users } from "../../api";
import { parseJwt } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const EditProfile = props => {
  const [profileInfo, setProfileInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState({
    username: profileInfo.username,
    cpassword: "",
    email: profileInfo.email
  });
  const [modalShow, setModalShow] = useState(false);

  const fetchProfileData = async () => {
    await users
      .get(parseJwt(localStorage.getItem("jwt")).username)
      .then(res => {
        setProfileInfo(res.data);
        setInput({
          username: res.data.username,
          password: "",
          email: res.data.email
        });
      });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async () => {
    await users.update(profileInfo.username, input);
  };

  return (
    <div className="EditProfile-Page">
      <Modal isOpen={modalShow} toggle={() => setModalShow(!modalShow)}>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalBody>This action cannot be undone later!</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={async () => {
              await users.upgrade(profileInfo.username);
              setModalShow(false);
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setModalShow(false)}>No</Button>
        </ModalFooter>
      </Modal>
      <Row>
        <Col md={3} />
        <Col md={6}>
          <Card inverse color="info">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Email:</Label>
                  <Input
                    name="email"
                    value={input.email}
                    onChange={handleInput}
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
                        <FontAwesomeIcon
                          icon={isVisible ? faEyeSlash : faEye}
                        />
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
                <Button color="primary" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </Form>
            </CardBody>
            {parseInt(profileInfo.role) === 4 ? (
              <CardFooter>
                <Button color="primary" onClick={() => setModalShow(true)}>
                  Upgrade to company
                </Button>
              </CardFooter>
            ) : null}
          </Card>
        </Col>
        <Col md={3} />
      </Row>
    </div>
  );
};

export default EditProfile;
