import React, { useState } from 'react';

import moment from 'moment';

import '../Stylesheets/Modal.scss';

import AddRide from './AddRide';
import AddFlight from './AddFlight';

import { urls } from '../utilities/urls';
import { authFetch } from '../utilities/functions';

function Modal({
  toggleModal,
  toggleFlight,
  person,
  flight,
  addFlight,
  updateRide,
  removeRide
}) {

  const [datetime, setDatetime] = useState(
    moment.parseZone(flight.datetime_string) || moment(new Date())
  );
  const [direction, setDirection] = useState('');
  const [airport, setAirport] = useState('');
  const [airline, setAirline] = useState('');
  const [flightNumber, setFlightNumber] = useState('');

  const handleClick = () => {
    toggleFlight();
    toggleModal();
  }

  const handleDate = date => {
    const datetime = moment(date._d).format();
    setDatetime(datetime);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!flight.id) {
      const flightInfo = {
        datetime,
        direction,
        airport,
        airline,
        flightNumber
      };
      createFlight(person, flightInfo, addFlight);
    }
    else if (flight.ride) {
      updateCurrentRide(person, flight, datetime, updateRide);
    } else if (!flight.ride) {
      createRide(person, flight, datetime, updateRide);
    }

    handleClick();
  }

  const deleteRide = () => {
    const deleteURL = `${urls.rides}/${flight.ride.id}`;

    authFetch(deleteURL, 'DELETE');

    removeRide(flight, flight.ride);

    handleClick();
  }

  return (
    <section className='modal'>
      <div 
        className='overlay'
        onClick={ handleClick }
      >    
      </div>
      <div className='modal-content'>
        <button 
          className='close-modal'
          onClick={ handleClick }
        >X
        </button>
        {flight.id
          ? <AddRide
            person={ person }
            flight={ flight }
            datetime={ datetime }
            handleDate={ handleDate }
            handleSubmit={ handleSubmit }
            deleteRide={ deleteRide }
          />
          : <AddFlight
            datetime={ datetime }
            setDirection={ setDirection }
            setAirport={ setAirport }
            setAirline={ setAirline }
            setFlightNumber={ setFlightNumber }
            handleDate={ handleDate }
            handleSubmit={ handleSubmit }
          />
        }
      </div>
    </section>
  );
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

  authFetch(urls.flights, 'POST', body)
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

  authFetch(patchURL, 'PATCH', rideBody)
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

  authFetch(urls.rides, 'POST', body)
    .then(ride => updateRide(flight, ride.data.attributes))
    .catch(error => console.error(error));
}

export default Modal;