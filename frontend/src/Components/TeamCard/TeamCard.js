import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./TeamCard.scss";
import { Card, Row, Col, CardFooter, CardBody } from "reactstrap";
import moment from "moment";

const TeamCard = props => {
  const { firstName, lastName, username, email, created } = props;
  return (
    <Card className="TeamCard-Wrap">
      <CardBody className="TeamCard-Body">
        <Row className="TeamCard-Info">
          <Col className="TeamCard-Names">
            <h5>
              {firstName} {lastName}
            </h5>
            <h6>{username}</h6>
          </Col>
          <Col className="TeamCard-Email">
            <h6>{email}</h6>
          </Col>
        </Row>
        <Row className="TeamCard-Joined">
          Joined: {moment(created).fromNow()}
        </Row>
      </CardBody>
      <CardFooter className="TeamCard-Footer">
        <FontAwesomeIcon icon={faTrash} />
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
