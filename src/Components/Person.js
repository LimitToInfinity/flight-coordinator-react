import React from "react";

import './../Stylesheets/Person.scss';

function Person({ person, togglePerson }) {

    const handleClick = () => {
        togglePerson(person);
    }

    const selectedPerson = () => {
        return (
            <div>
                <h3>{ person.name }</h3>
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
                <h3>Choose someone</h3>
                <img
                    alt="unknown"
                    src="https://cdn4.iconfinder.com/data/icons/business-vol-4-2/100/Artboard_15-512.png"
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