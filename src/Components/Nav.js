import React from "react";

import './../Stylesheets/Nav.scss';

import Person from "./Person";

function Nav({ person, setPerson }) {

    return (
        <nav>
            <Person
                setPerson={ setPerson }
                person={ person }
            />
        </nav>
    );
}

export default Nav;