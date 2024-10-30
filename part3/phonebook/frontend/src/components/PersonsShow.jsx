import React from "react";

const PersonsShow = ({ personsToShow, deletePerson }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
            {/* se activa la función al llamarla así () => */}
          </p>
        </div>
      ))}
    </>
  );
};

export default PersonsShow;