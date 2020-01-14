import axios from "axios";
import { parseJwt, BASE_URL } from "../utils";

const instance = axios.create({
  baseURL: BASE_URL,
  //timeout: 10000,
  params: {} // do not remove this, its added to add params later in the config
});

instance.interceptors.request.use(
  function(config) {
    const jwt = parseJwt(localStorage.getItem("jwt"));
    if (Math.floor(Date.now() / 1000) > jwt.exp) {
      localStorage.removeItem("jwt");
      window.location.href = "/";
    } else {
      return config;
    }
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
