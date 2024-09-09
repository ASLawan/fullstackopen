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

const create = async (newBlogObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newBlogObj, config);

  return res.data;
};

export default {
  getAll,
  setToken,
  create,
};
