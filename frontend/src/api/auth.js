import { BASE_URL } from "../utils";
import axios from "axios";

export default {
  login: (type, body) => axios.post(`${BASE_URL}/authenticate/${type}`, body),
  registration: body => axios.post(`${BASE_URL}/registration`, body)
};
