import { Route } from 'react-router-dom';

import Login from './Login';
import Authorized from './Authorized';
import Travels from './Travels';

function MyRoutes() {
  return (
    <> 
      <Route path='/login' component={Login} />
      <Route path='/choose' component={Authorized} />
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