import { useState } from 'react';
import { useDispatch } from 'react-redux';

import '../Stylesheets/Login.scss';

import { Box } from '@material-ui/core';

import MUITypography from './MUITypography';
import MUITextField from './MUITextField';
import MUIButton from './MUIButton';

import { urls } from '../utilities/urls';
import { noAuthFetch } from '../utilities/functions';

function Login({ history }) {

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event, guest) => {
    event.preventDefault();
    dispatch({ type: 'LOADING' });

    const userBody = JSON.stringify({
      username: guest || username,
      password: guest || password
    });

    noAuthFetch(urls.login, 'POST', userBody)
      .then(({token}) => {
        localStorage.setItem('token', token);
        history.replace('/choose');
        dispatch({ type: 'LOGIN' });
        dispatch({ type: 'LOADED' });
      })
      .catch(error => console.error(error));
  }

  return (
    <Box>
      <MUITypography isParagraph={ true } text='Existing user' />
      <form className='login'>
        <MUITextField
          type='text'
          name='username'
          onChange={ event => setUsername(event.target.value) }
        />
        <MUITextField
          type='password'
          name='password'
          onChange={ event => setPassword(event.target.value) }
        />
        <MUIButton text='Login' onClick={ handleSubmit } />
      </form>

      <MUITypography text='OR' />
      <MUIButton
        text='Login as guest' 
        onClick={ event => handleSubmit(event, 'guest') }
      />
    </Box>
  );
}

export default Login;