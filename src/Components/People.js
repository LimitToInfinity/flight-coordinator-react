import React from "react";

import './../Stylesheets/People.scss';

import Person from "./Person";

function People({ people, setPerson }) {

    const displayPeople = () => {
        return people.map(person => {
            return <Person
                key={ person.id }
                person={ person.attributes }
                setPerson={ setPerson }
            />
        })
    }

    return (
        <section className="people">
            { displayPeople() }
        </section>
    );
}

export default People;