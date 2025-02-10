import { useState, useEffect } from "react" 
import Note from "./components/Note" 
import Notification from "./components/Notification" 
import Footer from "./components/Footer" 
import noteService from "./services/notes" 

const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState("") 
  const [showAll, setShowAll] = useState(true) 
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => { // estos then serían para el método del servicio
        setNotes(initialNotes) 
      }) 
  }, [])  // argumento 1: la función a ejecutar, argumento 2: array de dependencias, si alguna dependencia cambia, se vuelve a ejecutar. si está vacío una vez solo al iniciar.

  console.log("render", notes.length, "notes") 

  const addNote = (event) => {
    event.preventDefault() 
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    } 

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote)) 
        setNewNote("") 
      }) 
  } 

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)  // busca la nota a cambiar
    const changedNote = { ...note, important: !note.important }  // crea una copia de la nota y le cambia la importancia
    // changedNote = { id: 1, content: "Learn React", important: false } coge lo que hay anterior

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))  // map crea el nuevo array de notas, si no coincide se copia tal cual, si el id es el mismo se pone el actualizado. digamos que va copiando y comprobando uno a uno.
      })
      .catch(error => {
        setErrorMessage (
          `the note '${note.content}' was already deleted from server `
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      }) 
  } 

  const handleNoteChange = (event) => {
    setNewNote(event.target.value) 
  } 

  const handleLogin = (event) => {
    event.preventDefault()
    console.log(('logging in with ', username, password))
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)  // Si showAll es true, las muestra todas, si no las filtra

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>

      <form onSubmit={handleLogin}>
      <div>
        username <input type="text" value={username}
        name="Username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        pasasword <input type="pasasword" value={pasasword}
        name="Password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
      </form>





      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"} {/* esto solo mostrará texto */}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  ) 
} 

export default App 
