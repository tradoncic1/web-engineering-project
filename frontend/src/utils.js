const getBaseUrl = () => {
  var getUrl = window.location;
  var baseUrl =
    getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1];
  if (baseUrl.includes("localhost")) {
    baseUrl = "http://localhost:5000";
  }
  //console.log(baseUrl);
  return baseUrl;
};

export const BASE_URL = getBaseUrl();
