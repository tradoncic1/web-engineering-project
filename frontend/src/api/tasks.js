import axios from "./axios";
import { BASE_URL, getHeaders } from "../utils";

export default {
  addTask: (projectKey, body) =>
    axios.post(`${BASE_URL}/tasks/create/${projectKey}`, body, {
      headers: getHeaders()
    }),
  getTasks: body =>
    axios.post(`${BASE_URL}/tasks/search`, body, {
      headers: getHeaders()
    }),
  status: (username, body) =>
    axios.put(`${BASE_URL}/tasks/status/${username}`, body, {
      headers: getHeaders()
    }),
  delete: body =>
    axios.post(`${BASE_URL}/tasks/delete`, body, {
      headers: getHeaders()
    })
};
