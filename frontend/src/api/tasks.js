import axios from "./axios";
import { BASE_URL } from "../utils";

export default {
  addTask: (projectKey, body) =>
    axios.post(`${BASE_URL}/tasks/create/${projectKey}`, body, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    }),
  getTasks: body =>
    axios.post(`${BASE_URL}/tasks/search`, body, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    }),
  status: (username, body) =>
    axios.put(`${BASE_URL}/tasks/status/${username}`, body, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    }),
  delete: (username, body) =>
    axios.put(`${BASE_URL}/tasks/delete`, body, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    })
};
