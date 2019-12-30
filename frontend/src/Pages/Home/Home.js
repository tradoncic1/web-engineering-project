import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { parseJwt } from "../../utils";
import "./Home.scss";
import { users, tasks } from "../../api";
import MainNavbar from "../../Components/Navbars/MainNavbar";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "../../Components/TaskCard/TaskCard";

const Home = props => {
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    role: 0
  });
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: ""
  });
  const [tasksState, setTasks] = useState([]);

  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [addedTask, setAddedTask] = useState(false);
  const [taskModal, setTaskModal] = useState(false);

  const fetchProfileData = async () => {
    setIsLoadingProfile(true);

    const username = parseJwt(localStorage.getItem("jwt")).username;

    await users.get(username).then(res => setProfileInfo(res.data));

    setIsLoadingProfile(false);
  };

  const fetchUserTasks = async () => {
    const username = parseJwt(localStorage.getItem("jwt")).username;

    await tasks
      .getTasks(username)
      .then(res => {
        setTasks(res.data);
      })
      .catch(e => console.log(e.response));
  };

  useEffect(async () => {
    if (!localStorage.getItem("jwt")) {
      props.history.push("/login");
      window.location.reload();
    } else {
      await fetchProfileData();
    }
  }, [props.match.params.username]);

  useEffect(() => {
    fetchUserTasks();
  }, [addedTask]);

  const toggleTaskModal = () => setTaskModal(!taskModal);

  const handleTaskInput = event => {
    const name = event.target.name;
    const value = event.target.value;

    setTaskInput(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleTaskSubmit = async () => {
    const username = parseJwt(localStorage.getItem("jwt")).username;
    await tasks.addTask(username, taskInput);

    setAddedTask(!addedTask);
    setTaskModal(false);
  };

  return (
    <div className="Home-Page">
      <Modal
        size="lg"
        isOpen={taskModal}
        toggle={toggleTaskModal}
        className="Home-TaskModal"
      >
        <ModalHeader>Create new task</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Task title:</Label>
              <Input
                name="title"
                value={taskInput.title}
                placeholder="eg. 'Make task input'"
                onChange={handleTaskInput}
                valid={taskInput.title.length > 0}
              />
            </FormGroup>
            <FormGroup>
              <Label>Task description:</Label>
              <Input
                name="description"
                type="textarea"
                value={taskInput.description}
                placeholder="eg. 'Allow it so that the user can input task information into the form.'"
                onChange={handleTaskInput}
                valid={taskInput.description.length > 0}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleTaskSubmit}>
            Add task
          </Button>
          <Button color="secondary" onClick={toggleTaskModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <MainNavbar />
      <div className="Home-Wrapper">
        <Row className="Home-HeaderWrap">
          <Col md={3} />
          <Col md={6}>
            <Row className="Home-Header">
              <div className="Home-Avatar">
                {profileInfo.firstName.substring(0, 1)}
                {profileInfo.lastName.substring(0, 1)}
              </div>
              <span className="Home-Username">{profileInfo.username}</span>
              <span className="Home-Name">
                {profileInfo.firstName} {profileInfo.lastName}
              </span>
            </Row>
          </Col>
          <Col md={3} />
        </Row>
        <Row className="Home-TasksRow">
          <Col md={3} className="Home-Todo Home-TasksColumn">
            To Do
            <div className="Home-CreateTask" onClick={() => setTaskModal(true)}>
              <FontAwesomeIcon icon={faPlusCircle} /> Create task
            </div>
            {tasksState
              .filter(task => task.status === 1)
              .map(task => (
                <TaskCard
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  id={task._id}
                  addedTask={addedTask}
                  setAddedTask={setAddedTask}
                />
              ))}
          </Col>
          <Col md={3} className="Home-InProgress Home-TasksColumn">
            In Progress
            {tasksState
              .filter(task => task.status === 2)
              .map(task => (
                <TaskCard
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  id={task._id}
                  addedTask={addedTask}
                  setAddedTask={setAddedTask}
                />
              ))}
          </Col>
          <Col md={3} className="Home-Completed Home-TasksColumn">
            Completed
            {tasksState
              .filter(task => task.status === 3)
              .map(task => (
                <TaskCard
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  id={task._id}
                  addedTask={addedTask}
                  setAddedTask={setAddedTask}
                />
              ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(Home);
