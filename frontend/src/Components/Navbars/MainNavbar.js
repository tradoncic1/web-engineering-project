import React, { useState, useEffect } from "react";
import {
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";

import "./MainNavbar.scss";

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModalShow, setLogoutModalShow] = useState(false);

  const handleCollapseClose = () => setIsOpen(false);

  const logout = () => {
    setLogoutModalShow(!logoutModalShow);
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  const itemsMarkup = (
    <div className="MainNavbar-Items">
      <div className="MainNavbar-Item" onClick={handleCollapseClose}>
        <Link to="/home">Home</Link>
      </div>
      <div className="MainNavbar-Item" onClick={handleCollapseClose}>
        <Link>Edit Profile</Link>
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

  return (
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
  );
};

export default MainNavbar;
