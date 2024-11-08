import { useState, useEffect } from "react" 
import PersonsForm from "./components/PersonsForm"  //ver si components va dentro o fuera de SRC
import Filter from "./components/Filter" 
import Notification from "./components/Notification" 
import PersonsShow from "./components/PersonsShow" 
import personService from "./services/persons" 

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("") 
  const [newNumber, setNewNumber] = useState("") 
  const [results, setResults] = useState("")  //del filtrado
  const [message, setMessage] = useState(null) 
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        // estos then serían para el método del servicio
        setPersons(initialPersons) 
      }) 
  }, []) 

  const addNewPerson = (event) => {
    event.preventDefault() 
    const newPerson = { name: newName, number: newNumber } 
    const personExists = persons.find((person) => person.name === newPerson.name) 

    if (!personExists) {
      personService
      .create(newPerson)
      .then((response) => { // esto ya me devuelve el data
        setPersons(persons.concat(response)) 
        setNewName("") 
        setNewNumber("") 
        setMessage(`Added ${newName}`)
        setMessageType("success")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }) 
    } else {
      if (window.confirm(`${newName} is already added to phonebook, resplace the old number with a new one?`)) {
        const personUpdate = { ...personExists, number: newNumber } 

        personService
          .update(personExists.id, personUpdate)
          .then(returnedPerson => {
            setPersons(persons.map((person) => (person.id !== personUpdate.id ? person : returnedPerson)))
          })
          setMessage(`Updated ${newName}`)
          setMessageType("success")
          setTimeout(() => {
          setMessage(null)
        }, 5000)
      } 
    }
  } 

  const personsToShow = results
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(results.toLowerCase())
      )
    : persons 

  const handleSetNewName = (event) => {
    setNewName(event.target.value) 
  } 

  const handleSetNewNumber = (event) => {
    setNewNumber(event.target.value) 
  } 

  const handleFilter = (event) => {
    setResults(event.target.value) 
  } 

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id) 
    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id)) 
      })
      .catch(error => {
        setMessage (`Information of '${personToDelete.name}' was already deleted from server `)
        setMessageType("error")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      }) 
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter results={results} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonsForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleSetNewName={handleSetNewName}
        newNumber={newNumber}
        handleSetNewNumber={handleSetNewNumber}
      />
      <h3>Numbers</h3>
      <PersonsShow personsToShow={personsToShow} deletePerson={handleDeletePerson}/>
    </div>
  ) 
} 

export default App 
