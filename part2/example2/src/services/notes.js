import axios from "axios" 

const baseUrl = "http://localhost:3001/notes" 

const getAll = () => {
  const request = axios.get(baseUrl)  // esto devuelve una promesa
  /* devolvería una cosa así 
                    {
                    "data": [ ... ], // array de notas
                    "status": 200,
                    "statusText": "OK",
                    "headers": { ... },  // cabeceras de la respuesta 
                    "config": { ... },  // configuración de la solicitud 
                    "request": { ... } // objeto de la solicitud 
                  } */
  return request.then((response) => response.data)  //este then es para el axios
} 

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject) 
  return request.then((response) => response.data) 
} 

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject) 
  return request.then((response) => response.data) 
} 

export default { getAll, create, update } 

/*export default {
  // es lo mismo que lo de arriba 
  // propiedad : función
  getAll: getAll,
  create: create,
  update: update,
  
} */
