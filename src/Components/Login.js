import React, { Component } from 'react';

import './../Stylesheets/Login.scss';

import { TextField, Button } from '@material-ui/core';

const loginURL = "https://cousintrackerback.herokuapp.com/login/";

class Login extends Component {

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
        const { setToken } = this.props;
    
        const userBody = JSON.stringify({ username, password });
    
        fetchCall(loginURL, "POST", userBody)
            .then(parseJSON)
            .then(data => {
                const { token } = data;
                sessionStorage.setItem("token", token);
                setToken(data.token);
            })
            .catch(error => console.error(error));
    }

    render() {

        return (
        <form className="login">
            <TextField
                onChange={ this.handleChange }
                id="username"
                name="username"
                label="Username"
                type="text"
                autoComplete="current-username"
                variant="outlined"
                color="primary"
                margin="normal"
            />

            <TextField
                onChange={ this.handleChange }
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                color="primary"
                margin="normal"
            />

            <Button
                onClick={ this.handleSubmit }
                variant="outlined"
                color="primary"
                type="submit"
            >
                Submit
            </Button>
            </form>
        );
    }
}
    
function fetchCall(url, method, body){
    const headers = { "Content-Type": "application/json" };
    return fetch( url, { method, headers, body });
}

function parseJSON(response) {
    return response.json();
}
    
export default Login;
