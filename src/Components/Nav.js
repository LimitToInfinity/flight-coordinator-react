import React from "react";

import '../Stylesheets/Nav.scss';

import Person from "./Person";

function Nav({ person, togglePerson }) {

  return (
    <nav>
      <Person person={ person } togglePerson={ togglePerson } />
    </nav>
  );
}

export default Nav;