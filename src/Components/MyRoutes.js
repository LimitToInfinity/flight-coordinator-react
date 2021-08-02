import { Route } from 'react-router-dom';

import Login from './Login';
import Authorized from './Authorized';
import Travels from './Travels';

function MyRoutes() {
  return (
    <> 
      <Route path='/login' component={Login} />
      <Route path='/choose' component={Authorized} />
      <Route path='/flights' component={Travels} />
    </>
  );
}

export default MyRoutes;