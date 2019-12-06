import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import { Link } from "react-router-dom";

import "./LandingNavbar.scss";

const LandingNavbar = () => {
  const [navColor, setNavColor] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleCollapseClose = () => setIsOpen(false);

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
      <div className="LandingNavbar-Item" onClick={handleCollapseClose}>
        <Link to="/">Home</Link>
      </div>
      <div className="LandingNavbar-Item" onClick={handleCollapseClose}>
        <a
          href="https://github.com/tradoncic1/web-engineering-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </div>
      <div className="LandingNavbar-Item" onClick={handleCollapseClose}>
        <Link to="/login">Log In</Link>
      </div>
      <div
        className="LandingNavbar-Item LandingNavbar-Register"
        onClick={handleCollapseClose}
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
          <i
            className="LandingNavbar-Collapsable--Icon fas fa-bars"
            onClick={() => setIsOpen(!isOpen)}
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
