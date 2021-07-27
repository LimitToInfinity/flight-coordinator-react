import React, { useState, useEffect } from 'react';

import '../Stylesheets/App.scss';

import Authorized from './Authorized';
import Login from './Login';

import { urls } from '../utilities/urls';
import { authFetch } from '../utilities/functions';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToken = error => {
    error ? localStorage.removeItem("token") : setIsLoggedIn(true);
  }

  useEffect(() => {
    const checkTokenValidity = async () => {
      const { error } = await authFetch(urls.shuttles);
      handleToken(error);
    }

    localStorage.token && checkTokenValidity();
  }, []);


  return (
    <div className={isLoggedIn ? "App" : "App gradient"}>
      {isLoggedIn
        ? <Authorized setIsLoggedIn={ setIsLoggedIn } />
        : <Login setIsLoggedIn={ setIsLoggedIn } />
      }
    </div>
  );
}

export default App;