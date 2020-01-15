import axios from "./axios";
import { BASE_URL, getHeaders } from "../utils";

export default {
  create: (username, body) =>
    axios.post(`${BASE_URL}/company/members/${username}`, body, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    }),
  update: (username, body) =>
    axios.post(`${BASE_URL}/users/update/${username}`, body, {
      headers: getHeaders()
    }),
  search: username =>
    axios.get(`${BASE_URL}/company/search/${username}`, {
      headers: { auth: localStorage.getItem("jwt") }
    }),
  delete: username =>
    axios.delete(`${BASE_URL}/company/${username}`, { headers: getHeaders() })
};
