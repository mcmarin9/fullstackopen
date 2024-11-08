import React from "react" 

const PersonsForm = (props) => {
  return (
    <>
      <form onSubmit={props.addNewPerson}>
        <div>
          <p>
            name:{" "}
            <input onChange={props.handleSetNewName} value={props.newName} />
          </p>
          number:{" "}
          <input onChange={props.handleSetNewNumber} value={props.newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  ) 
} 

export default PersonsForm 
