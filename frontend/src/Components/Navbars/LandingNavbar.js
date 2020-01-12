import React, { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

import "./LandingNavbar.scss";

const LandingNavbar = props => {
  const NAV_COL = "rgba(31, 16, 247, 0.65)";

  const [navColor, setNavColor] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (
      props.location.pathname === "/" ||
      props.location.pathname === "/login" ||
      props.location.pathname === "register"
    )
      setShouldRender(true);
    else setShouldRender(false);
  }, [props.location.pathname]);

  const handleCollapseClose = () => setIsOpen(false);

  const listenScrollEvent = e => {
    if (window.scrollY > 275) {
      setNavColor(NAV_COL);
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
        <Link to="/register">Register</Link>
      </div>
    </div>
  );

  return shouldRender ? (
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
            onClick={() => {
              setIsOpen(!isOpen);
              window.scrollY < 275 && isOpen
                ? setNavColor("")
                : setNavColor(NAV_COL);
            }}
          />
        </div>
        <div
          className="LandingNavbar-Divider"
          style={{ width: isOpen ? "100%" : "0" }}
        />
        {itemsMarkup}
      </div>
      <Collapse isOpen={isOpen}>
        <div className="LandingNavbar-Collapsable--Content">{itemsMarkup}</div>
      </Collapse>
    </div>
  ) : null;
};

export default withRouter(LandingNavbar);
