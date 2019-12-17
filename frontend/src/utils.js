const getBaseUrl = () => {
  var getUrl = window.location;
  var baseUrl =
    getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1];
  if (baseUrl.includes("localhost")) {
    baseUrl = "http://localhost:5000";
  } else {
    baseUrl = baseUrl.substring(0, baseUrl.length - 1);
  }
  // console.log(baseUrl);
  return baseUrl;
};

export const getHeaders = () => {
  return {
    auth: localStorage.getItem("access_token"),
    "Content-Type": "application/json"
  };
};

export const BASE_URL = getBaseUrl();
