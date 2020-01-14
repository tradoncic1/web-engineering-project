import React, { useEffect, useState } from "react";
import MainNavbar from "../../Components/Navbars/MainNavbar";
import {
  Row,
  Col,
  Button,
  Spinner,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Form,
  ModalFooter
} from "reactstrap";
import { withRouter } from "react-router";
import { checkToken, parseJwt } from "../../utils";
import { users, company, projects } from "../../api";
import "./Projects.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Projects = props => {
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    role: 0
  });
  const [memberInput, setMemberInput] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });
  const [projectInput, setProjectInput] = useState({
    key: "",
    name: "",
    description: ""
  });
  const [projectList, setProjectList] = useState([]);
  const [userModal, setUserModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  const fetchProfileData = async () => {
    setIsLoadingProfile(true);

    const username = parseJwt(localStorage.getItem("jwt")).username;

    await users.get(username).then(res => {
      setProfileInfo(res.data);
      const projectUsername =
        res.data.role === 2 ? res.data.owner : res.data.username;
      fetchProjects(projectUsername);
    });

    setIsLoadingProfile(false);
  };

  useEffect(() => {
    if (!checkToken()) {
      props.history.push("/");
      window.location.reload();
    } else {
      fetchProfileData();
    }
  }, [props.match.params.username]);

  const fetchProjects = async username => {
    setIsLoadingProjects(true);
    await projects
      .search(username)
      .then(res => setProjectList(res.data.reverse()));

    setIsLoadingProjects(false);
  };

  const toggleUserModal = () => setUserModal(!userModal);
  const toggleProjectModal = () => setProjectModal(!projectModal);

  const handleMemberInput = event => {
    const name = event.target.name;
    const value = event.target.value;

    setMemberInput(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleProjectInput = event => {
    const name = event.target.name;
    const value = event.target.value;

    setProjectInput(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleUserSubmit = async () => {
    let memberBody = memberInput;
    if (memberBody.username.length === 0) {
      memberBody.username =
        memberBody.firstName.toLowerCase().substring(0, 1) +
        memberBody.lastName.toLowerCase();
    }

    if (memberBody.password.length === 0) memberBody.password = "12345678";

    company
      .create(parseJwt(localStorage.getItem("jwt")).username, memberBody)
      .catch(e => {
        toast.warn(
          `A user with that ${e.response.data.message} already exists`
        );
      });

    toggleUserModal();
  };

  const handleProjectSubmit = async () => {
    const username = parseJwt(localStorage.getItem("jwt")).username;
    await projects
      .create(username, projectInput)
      .then(res => {
        const tmpProject = {
          name: projectInput.name,
          description: projectInput.description,
          key: `${projectInput.key}${username}`,
          owner: username
        };
        const tmpProjList = [tmpProject, ...projectList];
        setProjectList([]);
        setProjectList(tmpProjList);
      })
      .catch(e => toast.warn("An error occured while creating the project"));
    setProjectModal(false);
  };

  const handleProjectDelete = async key => {
    const username =
      profileInfo.role === 2 ? profileInfo.owner : profileInfo.username;
    await projects.delete(username, key).then(res => {
      const newProjectList = projectList.filter(project => project.key !== key);

      setProjectList([]);
      setProjectList(newProjectList);
    });
  };

  return (
    <div className="Projects-Wrapper">
      {/** ADD MEMBER MODAL */}
      <Modal size="lg" toggle={toggleUserModal} isOpen={userModal}>
        <ModalHeader>Add a member</ModalHeader>
        <ModalBody>
          <Form>
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
              <Label>Member password:</Label>
              <Input
                name="password"
                type="password"
                value={memberInput.password}
                placeholder="********"
                onChange={handleMemberInput}
                valid={memberInput.email.length > 0}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={
              !memberInput.firstName ||
              !memberInput.lastName ||
              !memberInput.email
            }
            color="primary"
            onClick={handleUserSubmit}
          >
            Create
          </Button>
          <Button onClick={toggleUserModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* ADD PROJECT MODAL */}
      <Modal size="lg" toggle={toggleProjectModal} isOpen={projectModal}>
        <ModalHeader>Add Project</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label>Project Key:</Label>
                  <Input
                    name="key"
                    placeholder="TPR"
                    value={projectInput.key}
                    onChange={handleProjectInput}
                  />
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Label>Project Name:</Label>
                  <Input
                    name="name"
                    placeholder="Test Project"
                    value={projectInput.name}
                    onChange={handleProjectInput}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Input
                name="description"
                type="textarea"
                placeholder="Description..."
                value={projectInput.description}
                onChange={handleProjectInput}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!projectInput.key || !projectInput.name}
            color="primary"
            onClick={handleProjectSubmit}
          >
            Create
          </Button>
          <Button onClick={toggleProjectModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Row className="Projects-HeaderWrap">
        <Col md={3} />
        <Col md={6}>
          <Row className="Projects-Header">
            <div className="Projects-Avatar">
              {isLoadingProfile ? (
                <Spinner color="light" type="grow" />
              ) : (
                <div>
                  {profileInfo.firstName.substring(0, 1)}
                  {profileInfo.lastName.substring(0, 1)}
                </div>
              )}
            </div>
            <span className="Projects-Username">{profileInfo.username}</span>
            <span className="Projects-Name">
              {profileInfo.firstName} {profileInfo.lastName}
            </span>
          </Row>
          {profileInfo.role === 1 ? (
            <Button color="primary" onClick={() => setUserModal(true)}>
              Create User
            </Button>
          ) : null}
        </Col>
        <Col md={3} />
      </Row>
      <Row className="Projects-ListWrap">
        <Col md={2} />
        <Col md={8}>
          <Row className="Projects-CardWrap">
            {parseJwt(localStorage.getItem("jwt")).role === 2 ? null : (
              <Card className="Projects-Card" onClick={toggleProjectModal}>
                <FontAwesomeIcon icon={faPlusCircle} />
                Add Project
              </Card>
            )}
            {isLoadingProjects
              ? null
              : projectList.map((project, index) => (
                  <Card
                    key={index}
                    className="Projects-Card"
                    onClick={() =>
                      props.history.push(
                        `/tasks/${project.key.substring(
                          0,
                          project.key.length - project.owner.length
                        )}`
                      )
                    }
                  >
                    {profileInfo.role === 2 ? null : (
                      <FontAwesomeIcon
                        className="Projects-Delete"
                        icon={faTrashAlt}
                        onClick={() => handleProjectDelete(project.key)}
                      />
                    )}
                    {project.name}
                  </Card>
                ))}
          </Row>
        </Col>
        <Col md={2} />
      </Row>
    </div>
  );
};

export default Projects;
