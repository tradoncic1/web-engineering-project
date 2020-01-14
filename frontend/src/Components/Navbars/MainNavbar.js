import React, { useState, useEffect } from "react";
import {
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";

import "./MainNavbar.scss";
import { parseJwt } from "../../utils";

const MainNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModalShow, setLogoutModalShow] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (
      props.location.pathname === "/" ||
      props.location.pathname === "/login" ||
      props.location.pathname === "/register"
    )
      setShouldRender(false);
    else setShouldRender(true);
  }, [props.location.pathname]);

  const handleCollapseClose = () => setIsOpen(false);

  const logout = () => {
    setLogoutModalShow(!logoutModalShow);
    localStorage.removeItem("jwt");
    props.history.push("/");
  };

  const itemsMarkup = (
    <div className="MainNavbar-Items">
      {localStorage.getItem("jwt") &&
      parseJwt(localStorage.getItem("jwt")).role === 1 ? (
        <div className="MainNavbar-Item" onClick={handleCollapseClose}>
          <Link to="/teams">Teams</Link>
        </div>
      ) : null}
      <div className="MainNavbar-Item" onClick={handleCollapseClose}>
        <Link to="/projects">Projects</Link>
      </div>
      <div className="MainNavbar-Item" onClick={handleCollapseClose}>
        <Link to="/editProfile">Edit Profile</Link>
      </div>
      <div
        className="MainNavbar-Item MainNavbar-Logout"
        onClick={handleCollapseClose}
      >
        <Link
          onClick={() => {
            setLogoutModalShow(true);
          }}
        >
          Log Out
        </Link>
      </div>
    </div>
  );

  return shouldRender ? (
    <div className="MainNavbar-Wrapper">
      <Modal
        isOpen={logoutModalShow}
        toggle={() => {
          setLogoutModalShow(!logoutModalShow);
        }}
        className="Logout-Modal"
      >
        <ModalHeader
          toggle={() => {
            setLogoutModalShow(!logoutModalShow);
          }}
        >
          Are you sure?
        </ModalHeader>
        <ModalBody>Are you sure you want to log out of TrackR?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={logout}>
            Yes, log me out
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              setLogoutModalShow(!logoutModalShow);
            }}
          >
            No, take me back
          </Button>
        </ModalFooter>
      </Modal>
      <div className="MainNavbar">
        <div className="MainNavbar-Home">
          <Link to="/">TrackR</Link>
        </div>
        <div className="MainNavbar-Collapsable">
          <i
            className="MainNavbar-Collapsable--Icon fas fa-bars"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </div>
        <div
          className="MainNavbar-Divider"
          style={{ width: isOpen ? "100%" : "0" }}
        />
        {itemsMarkup}
      </div>
      <Collapse isOpen={isOpen}>
        <div className="MainNavbar-Collapsable--Content">{itemsMarkup}</div>
      </Collapse>
    </div>
  ) : null;
};

export default withRouter(MainNavbar);
