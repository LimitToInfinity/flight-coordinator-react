import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import 'react-datetime/css/react-datetime.css';

import '../Stylesheets/App.scss';

import Loading from './Loading';
import MyRoutes from './MyRoutes';

import { urls } from '../utilities/urls';
import { authFetch } from '../utilities/functions';

function App() {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.login);
  const isLoading = useSelector(state => state.loading);

  useEffect(() => {
    const handleToken = error => {
      error ? localStorage.removeItem('token') : dispatch({ type: 'LOGIN' });
    }

    const checkTokenValidity = async () => {
      const { error } = await authFetch(urls.shuttles);
      handleToken(error);
      dispatch({ type: 'LOADED' });
    }

    localStorage.token ? checkTokenValidity() : dispatch({ type: 'LOADED' });
  }, [dispatch]);

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
        : <MyRoutes />
      }
    </div>
  );
}

export default App;