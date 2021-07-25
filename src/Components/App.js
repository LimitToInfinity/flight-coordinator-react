import React, { Component } from 'react';

import '../Stylesheets/App.scss';

import Authorized from './Authorized';
import Login from './Login';

const shuttlesURL = "http://localhost:3000/shuttles";

class App extends Component {

  state = {
    token: "",
    status: false,
  }

  checkTokenValidity = () => {
    fetchCall(shuttlesURL)
      .then(response => this.handleToken(response.status));
  }

  handleToken = (status) => {
    status === 500
      ? localStorage.removeItem( "token" )
      : this.setState({ status: true });
  }

  componentDidMount() {
    this.checkTokenValidity();
  }

  setToken = (token) => {
    this.setState({ token });
  }
  
  render() {
    const { token, status } = this.state;

    return (
      <div className={token || status ? "App" : "App gradient"}>
        {token || status
          ? <Authorized />
          : <Login setToken={ this.setToken } />
        }
      </div>
    );
  }
}

function fetchCall(url) {
  const token = localStorage.getItem("token");
  const headers = { Authorization: "Bearer " + token };
  return fetch(url, { headers })
}

export default App;
