const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

// Función para obtener un ID que no existe en la base de datos
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

// Función para obtener los usuarios de la base de datos
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

// Función para obtener todas las notas de la base de datos
const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, usersInDb, notesInDb
}