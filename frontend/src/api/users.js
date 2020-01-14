import axios from "./axios";
import { BASE_URL, getHeaders } from "../utils";

export default {
  get: username =>
    axios.get(`${BASE_URL}/users/${username}`, { headers: getHeaders() }),
  update: (username, body) =>
    axios.post(`${BASE_URL}/users/update/${username}`, body, {
      headers: getHeaders()
    }),
  upgrade: username =>
    axios.post(`${BASE_URL}/users/upgrade/${username}`, {
      headers: getHeaders()
    })
};
