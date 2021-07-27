import React from "react";

import '../Stylesheets/Header.scss';

import Nav from "./Nav";

function Header({ person, togglePerson, setIsLoggedIn }) {

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <header>
      <h1 onClick={logout}>Flight Coordinator!</h1>
      <Nav
        person={ person }
        togglePerson={ togglePerson }
      />
    </header>
  );
}

export default Header;