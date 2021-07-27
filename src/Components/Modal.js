import React, { Component } from "react";

import moment from "moment";

import "../Stylesheets/Modal.scss";

import AddRide from "./AddRide";
import AddFlight from "./AddFlight";

import { urls } from '../utilities/urls';

class Modal extends Component {

  state = {
    datetime: moment.parseZone(this.props.flight.datetime_string) || 
      moment(new Date()),
    direction: "",
    airport: "",
    airline: "",
    flightNumber: "",
  };

  handleClick = () => {
    const { toggleModal, toggleFlight } = this.props;
    toggleFlight();
    toggleModal();
  }

  handleDate = (date) => {
    const datetime = moment(date._d).format();
    this.setState({ datetime });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { datetime } = this.state;
    const { person, flight, addFlight, updateRide } = this.props;

    if (!flight.id) {
      createFlight(person, this.state, addFlight);
    }
    else if (flight.ride) {
      updateCurrentRide(person, flight, datetime, updateRide);
    } else if (!flight.ride) {
      createRide(person, flight, datetime, updateRide);
    }

    this.handleClick();
  }

  deleteRide = () => {
    const { flight, removeRide } = this.props;
    const deleteURL = `${urls.rides}/${flight.ride.id}`;

    fetchCall(deleteURL, "DELETE");

    removeRide(flight, flight.ride);

    this.handleClick();
  }

  render() {
    const { datetime, direction, airport, airline, flightNumber } = this.state;

    const { flight, person } = this.props;

    return (
      <section className="modal">
        <div 
          className="overlay"
          onClick={ this.handleClick }
        >    
        </div>
        <div className="modal-content">
          <button 
            className="close-modal"
            onClick={ this.handleClick }
          >X
          </button>
          {flight.id
            ? <AddRide
              person={ person }
              flight={ flight }
              datetime={ datetime }
              handleDate={ this.handleDate }
              handleSubmit={ this.handleSubmit }
              deleteRide={ this.deleteRide }
            />
            : <AddFlight
              person={ person }
              datetime={ datetime }
              direction={ direction }
              airport={ airport }
              airline={ airline }
              flightNumber={ flightNumber }
              handleDate={ this.handleDate }
              handleChange={ this.handleChange }
              handleSubmit={ this.handleSubmit }
            />
          }
        </div>
      </section>
    );
  }
}

function createFlight(person, state, addFlight) {
  const { direction, airport, airline, flightNumber, datetime } = state;

  const flightParams = {
    traveler_id: person.id,
    direction,
    airport,
    airline,
    number: flightNumber,
    datetime: moment(datetime).format(),
    datetime_string: moment(datetime).format(),
  };
  const body = JSON.stringify(flightParams);

  fetchCall(urls.flights, "POST", body)
    .then(parseJSON)
    .then(flight => addFlight(flight.data.attributes))
    .catch(error => console.error(error));
}

function updateCurrentRide(person, flight, datetime, updateRide) {
  const rideBody = JSON.stringify({
    ride: {
      driver_id: person.id,
      shuttle_attributes: {
        id: flight.ride.shuttle.id,
        datetime: moment(datetime).format(),
        datetime_string: moment(datetime).format(),
      }
    }
  });
  const patchURL = `${urls.rides}/${flight.ride.id}`;

  fetchCall(patchURL, "PATCH", rideBody)
    .then(parseJSON)
    .then(ride => updateRide(flight, ride.data.attributes))
    .catch(error => console.error(error));
}

function createRide(person, flight, datetime, updateRide) {
  const rideParams = {
    ride: {
      driver_id: person.id,
      traveler_id: flight.traveler.id,
      flight_id: flight.id,
      shuttle_attributes: {
        datetime: moment(datetime).format(),
        datetime_string: moment(datetime).format(),
      }
    }
  };
  const body = JSON.stringify(rideParams);

  fetchCall(urls.rides, "POST", body)
    .then(parseJSON)
    .then(ride => updateRide(flight, ride.data.attributes))
    .catch(error => console.error(error));
}

function fetchCall(url, method, body) {
  const token = localStorage.getItem("token");
  const headers = { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
  return fetch(url, { method, headers, body });
}

function parseJSON(response) {
  return response.json();
}

export default Modal;