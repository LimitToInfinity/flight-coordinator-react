import React from "react";

import '../Stylesheets/Header.scss';

import Nav from "./Nav";

function Header({ person, togglePerson }) {

  return (
    <header>
      <h1>Flight Coordinator!</h1>
      <Nav
        person={ person }
        togglePerson={ togglePerson }
      />
    </header>
  );
}

export default Header;