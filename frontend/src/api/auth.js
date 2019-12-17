import axios from "axios";

import { BASE_URL, getHeaders } from "../utils";

export default {
  login: body => axios.post(`${BASE_URL}/authenticate`, body)
};
