import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { parseJwt } from "../../utils";
import "./Home.scss";
import { users } from "../../api";
import MainNavbar from "../../Components/Navbars/MainNavbar";
import { Row, Col } from "reactstrap";

const Home = props => {
  const [profileInfo, setProfileInfo] = useState({});
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const fetchProfileData = async () => {
    setIsLoadingProfile(true);

    const username = parseJwt(localStorage.getItem("jwt")).username;

    await users.get(username).then(res => setProfileInfo(res.data));

    setIsLoadingProfile(false);
  };

  useEffect(async () => {
    if (!localStorage.getItem("jwt")) {
      props.history.push("/login");
      window.location.reload();
    } else {
      await fetchProfileData();
    }
  }, [props.match.params.username]);

  return (
    <div className="Home-Page">
      <MainNavbar />
      <div className="Home-Wrapper">
        <Row className="Home-Header">
          <span>{profileInfo.username}</span>
          <span>
            {profileInfo.firstName} {profileInfo.lastName}
          </span>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(Home);
