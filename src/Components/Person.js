import React from "react";

import './../Stylesheets/Person.scss';

function Person({ person, setPerson }) {

    const handleClick = () => {
        setPerson(person);
    }

    const selectedPerson = () => {
        return (
            <div>
                <h2>{ person.name }</h2>
                <img
                alt={ person.name }
                src={ person.image }
                />
            </div>
        );
    }

    const noPerson = () => {
        return (
            <div>
                <h2>Choose someone</h2>
                <img
                alt="unknown"
                />
            </div>
        );
    }

    return (
        <div className="person" onClick={ handleClick }>
            {person.name
                ? selectedPerson()
                : noPerson()
            }
        </div>
    );
}

export default Person;