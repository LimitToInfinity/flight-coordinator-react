import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import '../Stylesheets/Authorized.scss';

import People from './People';
import Header from './Header';
import Travels from './Travels';
import Modal from './Modal';

import { urls } from '../utilities/urls';
import { authFetch, aToZ, extractData } from '../utilities/functions';

function Authorized() {

  const showModal = useSelector(state => state.modal);
  const person = useSelector(state => state.person);

  const [people, setPeople] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    authFetch(urls.people)
      .then(json => setPeople(extractData(json).sort(aToZ)));

    authFetch(urls.flights)
      .then(json => setFlights(extractData(json)));
  }, []);

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
    <div className='authorized'>
      {showModal &&
        <Modal
          addFlight={ addFlight }
          updateRide={ updateRide }
          removeRide={ removeRide }
        />
      }
      <Header />
      <main>
        {!person.id
          ? <People people={ people } />
          : <Travels allFlights={ flights } />
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