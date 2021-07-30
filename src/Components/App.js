import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import '../Stylesheets/App.scss';

import Loading from './Loading';
import MyRoutes from './MyRoutes';

import { urls } from '../utilities/urls';
import { authFetch } from '../utilities/functions';

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToken = error => {
    error ? localStorage.removeItem('token') : setIsLoggedIn(true);
  }
  
  useEffect(() => {
    const checkTokenValidity = async () => {
      const { error } = await authFetch(urls.shuttles);
      handleToken(error);
      setIsLoading(false);
    }

    localStorage.token ? checkTokenValidity() : setIsLoading(false);
  }, []);

  return (
    <div className={isLoggedIn ? 'App' : 'App gradient'}>
      <Route path='/'>
        {isLoggedIn
          ? <Redirect to='/choose' />
          : <Redirect to='/login' />
        }
      </Route>
      {isLoading 
        ? <Loading />
        : <MyRoutes setIsLoggedIn={setIsLoggedIn} />
      }
    </div>
  );
}

export default App;