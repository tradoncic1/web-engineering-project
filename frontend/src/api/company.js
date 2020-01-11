import axios from "axios";
import { BASE_URL } from "../utils";

export default {
  create: (username, body) =>
    axios.post(`${BASE_URL}/company/members/${username}`, body, {
      headers: {
        auth: localStorage.getItem("jwt")
      }
    })
};
