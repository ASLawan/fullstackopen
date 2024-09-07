import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

let token;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;

  return token;
};
export default {
  getAll,
  setToken,
};
