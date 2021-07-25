import React from "react";

import '../Stylesheets/People.scss';

import Person from "./Person";

function People({ people, togglePerson }) {

  const displayPeople = () => {
    return people.map(person => {
      return <Person
        key={ person.id }
        person={ person }
        togglePerson={ togglePerson }
      />
    })
  }

  return (
    <section>
      <h2>Choose yourself!</h2>
      <div className="people">
        { displayPeople() }
      </div>
    </section>
  );
}

export default People;