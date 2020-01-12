import axios from "axios";
import { BASE_URL } from "../utils";

export default {
  create: (username, body) =>
    axios.post(`${BASE_URL}/projects/create/${username}`, body, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    }),
  search: username =>
    axios.get(`${BASE_URL}/projects/search/${username}`, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    })
};
