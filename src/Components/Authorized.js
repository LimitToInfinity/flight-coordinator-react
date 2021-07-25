import React, { Component } from 'react';

import '../Stylesheets/Authorized.scss';

import People from './People';
import Header from './Header';
import Travels from './Travels';
import Modal from './Modal';

const peopleURL = "http://localhost:3000/people/";
const flightsURL = "http://localhost:3000/flights/";
const ridesURL = "http://localhost:3000/rides/";
const shuttlesURL = "http://localhost:3000/shuttles/";

class Authorized extends Component {
  
  state = {
    isModal: false,
    person: {},
    flight: {},
    people: [],
    flights: [],
    rides: [],
    shuttles: [],
  }
  
  componentDidMount() {
    fetchCall( peopleURL )
      .then( parseJSON )
      .then( json => this.setState({ people: extractData(json).sort(aToZ) }) );

    fetchCall( flightsURL )
      .then( parseJSON )
      .then( json => this.setState({ flights: extractData(json) }) );

    fetchCall( ridesURL )
      .then( parseJSON )
      .then( json => this.setState({ rides: extractData(json) }) );

    fetchCall( shuttlesURL )
      .then( parseJSON )
      .then( json => this.setState({ shuttles: extractData(json) }) );
  }

  toggleModal = () => {
    const { isModal } = this.state;
    this.setState({ isModal: !isModal });
  }

  setPerson = (person) => {
    this.setState({ person });
  }

  unSetPerson = () => {
    this.setState({ person: {}, isModal: false });
  }

  setFlight = (flight) => {
    this.setState({ flight });
  }

  unSetFlight = () => {
    this.setState({ flight: {}, isModal: false });
  }

  addFlight = (flight) => {
    const { flights } = this.state;
    this.setState({ flights: [...flights, flight] });
  }

  updateRide = (modifiedFlight, newRide) => {
    const { flights, rides } = this.state;

    const updated = updateFlights(flights, modifiedFlight, newRide);
    const updatedRides = rides.filter(ride => ride.id !== newRide.id);

    this.setState({
      flights: [...updated.flights, updated.flight],
      rides: [...updatedRides, newRide]
    })
  }

  removeRide = (modifiedFlight, deletedRide) => {
    const { flights, rides } = this.state;

    const updated = updateFlights(flights, modifiedFlight, null);
    const updatedRides = rides.filter(ride => ride.id !== deletedRide.id);

    this.setState({ 
      flights: [...updated.flights, updated.flight], 
      rides: updatedRides 
    })
  }

  render() {
    const { isModal, person, flight,
      people, flights
    } = this.state;

    return (
      <div className="authorized">
        {isModal
          ? <Modal
            toggleModal={ this.toggleModal }
            toggleFlight={ this.unSetFlight }
            addFlight={ this.addFlight }
            updateRide={ this.updateRide }
            removeRide={ this.removeRide }
            flight={ flight }
            person={ person }
          />
          : null
        }
        <Header
          person={ person }
          togglePerson={ this.unSetPerson }
        />
        <main>
          {!person.name
            ? <People
              people={ people }
              togglePerson={ this.setPerson }
            />
            : <Travels
              allFlights={ flights }
              toggleModal={ this.toggleModal }
              toggleFlight={ this.setFlight }
            />
          }
        </main>
      </div>
    );
  }  
}

function updateFlights(flights, modifiedFlight, newRide) {
  const updatedFlights = flights.filter(flight => flight.id !== modifiedFlight.id);
  const updatedFlight = flights.find(flight => flight.id === modifiedFlight.id);
  updatedFlight.ride = newRide;

  return {
    flights: updatedFlights,
    flight: updatedFlight,
  }
}

function extractData(fastJson) {
  return fastJson.data.map(unNest);
}

function unNest(instance) {
  return instance.attributes;
}

function aToZ(a, b) {
  if (a.name < b.name) { return -1 }
  else if (a.name > b.name) { return 1 }
  else { return 0 }
}

function fetchCall(url) {
  const token = localStorage.getItem("token");
  const headers = { Authorization: "Bearer " + token };
  return fetch(url, { headers })
}

function parseJSON(response) {
  return response.json();
}

export default Authorized;
