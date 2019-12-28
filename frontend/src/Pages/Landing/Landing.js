import React, { useEffect } from "react";
import axios from "axios";

import "./Landing.scss";
import { BASE_URL } from "../../utils";

const Landing = () => {
  useEffect(() => {
    axios.get(`${BASE_URL}/users`).then(response => {
      console.log(response.data);
    });
  });
  return (
    <div className="Landing-Wrapper">
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
