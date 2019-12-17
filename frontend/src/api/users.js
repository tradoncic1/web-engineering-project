import axios from "axios";
import { BASE_URL, getHeaders } from "../utils";

export default {
  get: username =>
    axios.get(`${BASE_URL}/users/${username}`, { headers: getHeaders() })
};
