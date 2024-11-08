const express = require('express') 
const app = express() 
require('dotenv').config()  // Carga las variables de entorno desde un archivo .env

const Note = require('./models/note')  // Importa el modelo Note

app.use(express.static('dist'))  // Sirve archivos estáticos desde la carpeta  "dist "

// Middleware para registrar detalles de cada solicitud
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method) 
  console.log('Path:  ', request.path) 
  console.log('Body:  ', request.body) 
  console.log('---') 
  next()  // Pasa el control al siguiente middleware
} 

// Middleware para manejar errores
const errorHandler = (error, request, response, next) => {
  //El next sabe que esto es el handler por los parámetros
  console.error(error.message) 

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' }) 
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message }) 
  }

  next(error)  // Pasa el control al siguiente middleware de errores
} 

const cors = require('cors') 

app.use(cors())  // Habilita CORS
app.use(express.json())  // Parsear cuerpos de solicitud JSON
app.use(requestLogger)  // Usa el middleware de registro de solicitudes

// Middleware para manejar endpoints desconocidos
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' }) 
} 

// Ruta para la página principal
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>') 
}) 

// Ruta para obtener todas las notas
app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes) 
  }) 
}) 

// Ruta para crear una nueva nota
app.post('/api/notes', (request, response, next) => {
  const body = request.body 

  const note = new Note({
    content: body.content,
    important: body.important || false,
  }) 

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote) 
    })
    .catch((error) => next(error)) 
}) 

// Ruta para obtener una nota por ID
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note) 
      } else {
        response.status(404).end() 
      }
    })
    .catch((error) => next(error))  // Pasa el error al middleware de manejo de errores
}) 

// Ruta para eliminar una nota por ID
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
  /* eslint-disable no-unused-vars */
    .then((result) => {
      response.status(204).end() 
    })
    .catch((error) => next(error))  // Pasa el error al middleware de manejo de errores
}) 

// Ruta para actualizar una nota por ID
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body 

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedNote) => {
      response.json(updatedNote) 
    })
    .catch((error) => next(error))  // Pasa el error al middleware de manejo de errores
}) 

// Usa el middleware para manejar endpoints desconocidos
app.use(unknownEndpoint) 
// Usa el middleware para manejar errores
app.use(errorHandler) 

// Inicia el servidor en el puerto especificado en las variables de entorno
 
const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`) 
}) 
