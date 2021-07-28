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

  const closeModal = () => {
    toggleFlight();
    toggleModal();
  }

  const handleDate = date => setDatetime(moment(date._d).format());

  const handleSubmit = event => {
    event.preventDefault();

    if (!flight.id) {
      const flightInfo = { datetime, direction, airport, airline, flightNumber };
      createFlight(person, flightInfo, addFlight);
    } else if (flight.ride) {
      updateCurrentRide(person, flight, datetime, updateRide);
    } else if (!flight.ride) {
      createRide(person, flight, datetime, updateRide);
    }

    closeModal();
  }

  const deleteRide = () => {
    const deleteURL = `${urls.rides}/${flight.ride.id}`;
    authFetch(deleteURL, 'DELETE');

    removeRide(flight);

    closeModal();
  }

  return (
    <section className='modal'>
      <div className='overlay' onClick={ closeModal }></div>
      <div className='modal-content'>
        <button className='close-modal' onClick={ closeModal }>X</button>
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

function createFlight(person, flightInfo, addFlight) {
  const { direction, airport, airline, flightNumber, datetime } = flightInfo;

  const flightBody = JSON.stringify({
    direction,
    airport,
    airline,
    traveler_id: person.id,
    number: flightNumber,
    datetime: moment(datetime).format(),
    datetime_string: moment(datetime).format()
  });

  authFetch(urls.flights, 'POST', flightBody)
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
        datetime_string: moment(datetime).format()
      }
    }
  });
  const patchURL = `${urls.rides}/${flight.ride.id}`;

  authFetch(patchURL, 'PATCH', rideBody)
    .then(ride => updateRide(flight, ride.data.attributes))
    .catch(error => console.error(error));
}

function createRide(person, flight, datetime, updateRide) {
  const rideBody = JSON.stringify({
    ride: {
      driver_id: person.id,
      traveler_id: flight.traveler.id,
      flight_id: flight.id,
      shuttle_attributes: {
        datetime: moment(datetime).format(),
        datetime_string: moment(datetime).format()
      }
    }
  });

  authFetch(urls.rides, 'POST', rideBody)
    .then((ride) => updateRide(flight, ride.data.attributes))
    .catch(error => console.error(error));
}

export default Modal;