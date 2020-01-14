import React from "react";
import { Redirect } from "react-router";

const getBaseUrl = () => {
  var getUrl = window.location;
  var baseUrl =
    getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1];
  if (baseUrl.includes("localhost")) {
    baseUrl = "http://localhost:5000";
  } else {
    baseUrl = getUrl.protocol + "//" + getUrl.host;
  }
  // console.log(baseUrl);
  return baseUrl;
};

export const getHeaders = () => {
  return {
    auth: localStorage.getItem("jwt")
  };
};

export const parseJwt = token => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const checkToken = () => {
  if (!localStorage.getItem("jwt")) {
    return false;
  } else {
    if (localStorage.getItem("jwt").exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem("jwt");
      return false;
    }
  }
  return true;
};

export const BASE_URL = getBaseUrl();
