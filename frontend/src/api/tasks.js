import axios from "axios";
import { BASE_URL } from "../utils";

export default {
  addTask: (username, body) =>
    axios.post(`${BASE_URL}/tasks/${username}`, body, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    }),
  getTasks: username =>
    axios.get(`${BASE_URL}/tasks/${username}`, {
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
    axios.put(`${BASE_URL}/tasks/${username}`, body, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    })
};
