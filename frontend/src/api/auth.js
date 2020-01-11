import axios from "axios";
import { BASE_URL } from "../utils";

export default {
  login: (type, body) => axios.post(`${BASE_URL}/authenticate/${type}`, body),
  registration: body => axios.post(`${BASE_URL}/registration`, body)
};
