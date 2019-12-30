import React from "react";
import { Card, Col } from "reactstrap";

import "./TaskCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { tasks } from "../../api";
import { parseJwt } from "../../utils";

const TaskCard = ({
  title,
  description,
  status,
  id,
  addedTask,
  setAddedTask
}) => {
  const statusVariation = () => {
    switch (status) {
      case 1:
        return "Todo";
      case 2:
        return "InProgress";
      case 3:
        return "Completed";
    }
  };

  const handleStatusUp = async () => {
    const username = parseJwt(localStorage.getItem("jwt")).username;

    await tasks.status(username, { id: id, status: status + 1 });

    setAddedTask(!addedTask);
  };

  const handleStatusDown = async () => {
    const username = parseJwt(localStorage.getItem("jwt")).username;

    await tasks.status(username, { id: id, status: status - 1 });

    setAddedTask(!addedTask);
  };

  const handleDelete = async () => {
    const username = parseJwt(localStorage.getItem("jwt")).username;

    await tasks.delete(username, { id: id });

    setAddedTask(!addedTask);
  };

  return (
    <Card className="TaskCard">
      <div className={`TaskCard-Status TaskCard-Status${statusVariation()}`} />
      <div className="TaskCard-Info">
        <h3>{title}</h3>
        <div>{description}</div>
        <div className="TaskCard-StatusArrows">
          <Col md={2}>
            {status === 1 ? null : (
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="TaskCard-ArrowLeft"
                onClick={handleStatusDown}
              />
            )}
          </Col>
          <Col md={8} />
          <Col md={2}>
            {status === 3 ? null : (
              <FontAwesomeIcon
                icon={faChevronRight}
                className="TaskCard-ArrowRight"
                onClick={handleStatusUp}
              />
            )}
          </Col>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faTrash}
        className="TaskCard-Delete"
        onClick={handleDelete}
      />
    </Card>
  );
};

export default TaskCard;
