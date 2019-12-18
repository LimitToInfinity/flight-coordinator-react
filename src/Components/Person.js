import React from "react";

import './../Stylesheets/Person.scss';

function Person({ person, togglePerson }) {

    const handleClick = () => {
        window.scroll(0, 0);
        togglePerson(person);
    }

    const selectedPerson = () => {
        return (
            <>
                <h3>{ person.name }</h3>
                <img
                    alt={ person.name }
                    src={ person.image }
                />
            </>
        );
    }

    const noPerson = () => {
        return (
            <>
                <h3>Choose yourself</h3>
                <img
                    alt="unknown"
                    src="https://cdn4.iconfinder.com/data/icons/business-vol-4-2/100/Artboard_15-512.png"
                />
            </>
        );
    }

    return (
        <div className="person">
            <div onClick={ handleClick }>
                {person.name
                    ? selectedPerson()
                    : noPerson()
                }
            </div>
        </div>
    );
}

export default Person;