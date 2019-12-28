import axios from "axios";

import { BASE_URL } from "../utils";

export default {
  login: body => axios.post(`${BASE_URL}/authenticate`, body),
  registration: body => axios.post(`${BASE_URL}/registration`, body)
};
