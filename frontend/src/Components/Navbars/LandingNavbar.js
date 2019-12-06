import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import { Link } from "react-router-dom";

import "./LandingNavbar.scss";

const LandingNavbar = () => {
  const [navColor, setNavColor] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleCollapse = () => setIsOpen(!isOpen);

  const listenScrollEvent = e => {
    if (window.scrollY > 275) {
      setNavColor("rgba(128, 202, 202, 0.9)");
    } else {
      setNavColor("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const itemsMarkup = (
    <div className="LandingNavbar-Items">
      <div className="LandingNavbar-Item">
        <Link to="/">Home</Link>
      </div>
      <div className="LandingNavbar-Item" onClick={handleCollapse}>
        <a
          href="https://github.com/tradoncic1/web-engineering-project"
          target="_blank"
        >
          github
        </a>
      </div>
      <div className="LandingNavbar-Item" onClick={handleCollapse}>
        <Link to="/login">Log In</Link>
      </div>
      <div
        className="LandingNavbar-Item LandingNavbar-Register"
        onClick={handleCollapse}
      >
        <Link to="/">Register</Link>
      </div>
    </div>
  );

  return (
    <div
      className="LandingNavbar-Wrapper"
      style={{ backgroundColor: navColor }}
    >
      <div className="LandingNavbar">
        <div className="LandingNavbar-Home">
          <Link to="/">TrackR</Link>
        </div>
        <div className="LandingNavbar-Collapsable">
          <isOpen
            className="LandingNavbar-Collapsable--Icon fas fa-bars"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </div>
        {itemsMarkup}
      </div>
      <Collapse isOpen={isOpen}>
        <div className="LandingNavbar-Collapsable--Content">{itemsMarkup}</div>
      </Collapse>
    </div>
  );
};

export default LandingNavbar;
