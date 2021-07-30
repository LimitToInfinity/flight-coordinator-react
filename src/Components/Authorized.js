import React, { useState, useEffect } from 'react';

import '../Stylesheets/Authorized.scss';

import People from './People';
import Header from './Header';
import Travels from './Travels';
import Modal from './Modal';

import { urls } from '../utilities/urls';
import { authFetch, aToZ, extractData } from '../utilities/functions';

function Authorized({ setToken, setIsLoggedIn }) {
  
  const [showModal, setShowModal] = useState(false);
  const [person, setPerson] = useState({});
  const [flight, setFlight] = useState({});
  const [people, setPeople] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    authFetch(urls.people)
      .then(json => setPeople(extractData(json).sort(aToZ)));

    authFetch(urls.flights)
      .then(json => setFlights(extractData(json)));
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const unSetPerson = () => {
    setPerson({});
    setShowModal(false);
  }

  const unSetFlight = () => {
    setFlight({});
    setShowModal(false);
  }

  const addFlight = newFlight => setFlights([...flights, newFlight]);

  const updateRide = (modifiedFlight, newRide) => {
    const updated = updateFlights(flights, modifiedFlight, newRide);
    setFlights([...updated.flights, updated.flight]);
  }

  const removeRide = modifiedFlight => {
    const updated = updateFlights(flights, modifiedFlight, null);
    setFlights([...updated.flights, updated.flight]);
  }

  return (
    <div className="authorized">
      {showModal &&
        <Modal
          toggleModal={ toggleModal }
          toggleFlight={ unSetFlight }
          addFlight={ addFlight }
          updateRide={ updateRide }
          removeRide={ removeRide }
          flight={ flight }
          person={ person }
        />
      }
      <Header
        person={ person }
        togglePerson={ unSetPerson }
        setToken={ setToken }
        setIsLoggedIn={ setIsLoggedIn }
      />
      <main>
        {!person.name
          ? <People
            people={ people }
            togglePerson={ setPerson }
          />
          : <Travels
            allFlights={ flights }
            toggleModal={ toggleModal }
            toggleFlight={ setFlight }
          />
        }
      </main>
    </div>
  );
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

export default Authorized;