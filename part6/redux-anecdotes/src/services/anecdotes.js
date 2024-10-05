import axios from "axios";
import { getId } from "../reducers/anecdoteReducer";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);

  return res.data;
};

const createNewAnecdote = async (content) => {
  const obj = { content, id: getId(), votes: 0 };

  const res = await axios.post(baseUrl, obj);

  return res.data;
};

const updateAnecdote = async (id, anecdote) => {
  const obj = { ...anecdote };

  const res = await axios.put(`${baseUrl}/${id}`, obj);

  return res.data;
};
export default { getAll, createNewAnecdote, updateAnecdote };
