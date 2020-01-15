import { BASE_URL, getHeaders } from "../utils";
import axios from "./axios";

export default {
  create: (username, body) =>
    axios.post(`${BASE_URL}/projects/create/${username}`, body, {
      headers: getHeaders()
    }),
  search: username =>
    axios.get(`${BASE_URL}/projects/search/${username}`, {
      headers: getHeaders()
    }),
  delete: (owner, key) =>
    axios.delete(`${BASE_URL}/projects/delete/${owner}/${key}`, {
      headers: getHeaders()
    })
};
