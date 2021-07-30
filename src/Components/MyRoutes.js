import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login';
import Authorized from './Authorized';
import Travels from './Travels';

function MyRoutes({ setIsLoggedIn }) {

  return (
    <> 
      <Route
        path='/login'
        render={routerProps => <Login
          {...routerProps}
          setIsLoggedIn={setIsLoggedIn}
        />}
      />
      <Route
        path='/choose'
        render={() => <Authorized setIsLoggedIn={ setIsLoggedIn } />}
      />
      <Route
        path='/flights'
        render={() => <Travels
          // allFlights={ flights }
          // toggleModal={ toggleModal }
          // toggleFlight={ setFlight }
        />}
      />
    </>
  )
}

export default MyRoutes;