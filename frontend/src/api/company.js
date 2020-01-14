import axios from "./axios";
import { BASE_URL } from "../utils";

export default {
  create: (username, body) =>
    axios.post(`${BASE_URL}/company/members/${username}`, body, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    }),
  search: username =>
    axios.get(`${BASE_URL}/company/search/${username}`, {
      headers: { auth: localStorage.getItem("jwt") }
    })
};
