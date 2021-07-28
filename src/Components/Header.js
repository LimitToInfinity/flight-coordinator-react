import React from 'react';

import '../Stylesheets/Header.scss';

import Nav from './Nav';

import PlaneLogo from '../assets/images/plane-logo.png';

function Header({ person, togglePerson, setIsLoggedIn }) {

  const isMobile = window.matchMedia('(max-width: 600px)').matches;

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <header>
      <div className='logo-container'>
        {isMobile && <img src={PlaneLogo} alt='plane logo' />}
        <h1 onClick={logout}>Flight Coordinator!</h1>
      </div>
      <Nav person={ person } togglePerson={ togglePerson } />
    </header>
  );
}

export default Header;