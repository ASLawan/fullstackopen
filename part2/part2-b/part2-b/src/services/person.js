import axios from "axios";
const baseUrl = "/api/persons";

// get all persons
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// create person
const createPerson = (personObj) => {
  const request = axios.post(baseUrl, personObj);
  return request.then((response) => response.data);
};

// delete person
const deletePerson = (id) => {
  // const request = axios.delete(`${baseUrl}/${id}`);
  // return request.then((response) => response.data);

  return axios.delete(`${baseUrl}/${id}`);
};

// update person
const updatePerson = (id, newPersonObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newPersonObj);
  return request.then((response) => response.data);
};

export default { getAll, createPerson, deletePerson, updatePerson };
