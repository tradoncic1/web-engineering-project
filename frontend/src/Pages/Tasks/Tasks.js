import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { parseJwt, checkToken } from "../../utils";
import "./Tasks.scss";
import { tasks } from "../../api";
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
  Label,
  Spinner
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "../../Components/TaskCard/TaskCard";

const Tasks = props => {
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: ""
  });
  const [tasksState, setTasks] = useState([]);

  const [addedTask, setAddedTask] = useState(false);
  const [taskModal, setTaskModal] = useState(false);

  const fetchUserTasks = async () => {
    const username = parseJwt(localStorage.getItem("jwt")).username;

    await tasks
      .getTasks(username)
      .then(res => {
        setTasks(res.data);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    if (!checkToken()) {
      props.history.push("/");
      window.location.reload();
    } else {
      fetchUserTasks();
    }
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
    <div className="Tasks-Page">
      {/** ADD TASK MODAL */}
      <Modal
        size="lg"
        isOpen={taskModal}
        toggle={toggleTaskModal}
        className="Tasks-TaskModal"
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

      <div className="Tasks-Wrapper">
        <Row className="Tasks-TasksRow">
          <Col md={3} className="Tasks-Todo Tasks-TasksColumn">
            To Do
            <div
              className="Tasks-CreateTask"
              onClick={() => setTaskModal(true)}
            >
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
          <Col md={3} className="Tasks-InProgress Tasks-TasksColumn">
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
          <Col md={3} className="Tasks-Completed Tasks-TasksColumn">
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

export default withRouter(Tasks);
