import React, { useEffect } from "react";
import LandingNavbar from "../../Components/Navbars/LandingNavbar";
import "./Landing.scss";
import { checkToken } from "../../utils";
import { withRouter } from "react-router";

const Landing = props => {
  useEffect(() => {
    if (checkToken()) {
      props.history.push("/home");
    }
  });
  return (
    <div className="Landing-Wrapper">
      <LandingNavbar />
      <div className="Landing-Welcome">
        <div className="Landing-Title">TrackR</div>
      </div>
      <div className="Landing-Body">
        <div className="Landing-Body--Text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae quisquam facilis minima deleniti, ratione illum
            distinctio sed dicta beatae at. Ea voluptate praesentium eius quasi
            deserunt deleniti asperiores aperiam fuga.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae quisquam facilis minima deleniti, ratione illum
            distinctio sed dicta beatae at. Ea voluptate praesentium eius quasi
            deserunt deleniti asperiores aperiam fuga.
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
            aliquid delectus error at eligendi voluptatem soluta commodi illum
            veniam. Odit nisi ducimus eum sequi quibusdam, vero dignissimos odio
            quas totam.
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
            aliquid delectus error at eligendi voluptatem soluta commodi illum
            veniam. Odit nisi ducimus eum sequi quibusdam, vero dignissimos odio
            quas totam. Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Blanditiis distinctio vel explicabo a est nemo nulla nesciunt
            dicta quas ratione officia obcaecati dolorem error eveniet, quo
            vitae quisquam molestiae alias.
            <br />
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
            aliquid delectus error at eligendi voluptatem soluta commodi illum
            veniam. Odit nisi ducimus eum sequi quibusdam, vero dignissimos odio
            quas totam.
          </p>
        </div>
      </div>
      <div className="Landing-Footer"></div>
    </div>
  );
};

export default Landing;
