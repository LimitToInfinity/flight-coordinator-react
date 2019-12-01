import React from "react";

import './../Stylesheets/Header.scss';

import Nav from "./Nav";

function Header({ person, setPerson }) {

    return (
        <header>
            <h1>Cousin Tracker 1.0!</h1>
            <Nav
                person={ person }
                setPerson={ setPerson }
            />
        </header>
    );
}

export default Header;