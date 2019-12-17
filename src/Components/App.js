import React, { Component } from 'react';

import './../Stylesheets/App.scss';

import Authorized from './Authorized';

const loginURL = "http://localhost:3000/login/";

class App extends Component {

  state = {
    username: "",
    password: "",
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    const userBody = JSON.stringify({ username, password });

    fetchCall(loginURL, "POST", userBody)
      .then(response => response.json())
      .then(data => localStorage.setItem( "token", data.token ))
      .catch(error => console.error(error));
  }
  
  render() {

    return (
      <div className="App">
        {localStorage.getItem("token")
          ? <Authorized />
          : (<form onSubmit={ this.handleSubmit }>
             <label htmlFor="username">
              Username
            </label>
            <input
              onChange={ this.handleChange }
              type="text"
              id="username"
              name="username" 
              placeholder="username"
            />

            <label htmlFor="password">
              Password
            </label>
            <input 
              onChange={ this.handleChange }
              type="password"
              id="password"
              name="password" 
              placeholder="password"
            />

            <input type="submit" />
          </form>)
        }
      </div>
    );
  }
}

function fetchCall(url, method, body){
  const headers = { "Content-Type": "application/json" };
  return fetch( url, { method, headers, body });
}

export default App;
