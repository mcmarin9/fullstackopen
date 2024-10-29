import axios from "axios";

const baseUrl = "api/notes";

const getAll = () => {
  const request = axios.get(baseUrl); // esto devuelve una promesa
  return request.then((response) => response.data); //este then es para el axios
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update };

