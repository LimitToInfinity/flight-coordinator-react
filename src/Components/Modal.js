import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import '../Stylesheets/Modal.scss';

import AddRide from './AddRide';
import AddFlight from './AddFlight';

import { urls } from '../utilities/urls';
import { authFetch } from '../utilities/functions';

function Modal() {

  const dispatch = useDispatch();

  const person = useSelector(state => state.person);
  const flight = useSelector(state => state.flight);

  const [datetime, setDatetime] = useState(
    moment.parseZone(flight.datetime_string) || moment(new Date())
  );
  const [direction, setDirection] = useState('');
  const [airport, setAirport] = useState('');
  const [airline, setAirline] = useState('');
  const [flightNumber, setFlightNumber] = useState('');

  const closeModal = () => {
    dispatch({ type: 'UNSET_FLIGHT' });
    dispatch({ type: 'HIDE_MODAL' });
  }

  const handleDate = date => setDatetime(moment(date._d).format());

  const handleSubmit = event => {
    event.preventDefault();

    if (!flight.id) {
      const flightInfo = { person, datetime, direction, airport, airline, flightNumber };
      createFlight(flightInfo, dispatch);
    } else if (flight.ride) {
      updateCurrentRide(person, flight, datetime, dispatch);
    } else if (!flight.ride) {
      createRide(person, flight, datetime, dispatch);
    }

    closeModal();
  }

  const deleteRide = () => {
    const deleteURL = `${urls.rides}/${flight.ride.id}`;
    authFetch(deleteURL, 'DELETE');

    dispatch({ type: 'REMOVE_RIDE', modifiedFlightId: flight.id });

    closeModal();
  }

  return (
    <section className='modal'>
      <div className='overlay' onClick={ closeModal }></div>
      <div className='modal-content'>
        <button className='close-modal' onClick={ closeModal }>X</button>
        {flight.id
          ? <AddRide
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

function createFlight(flightInfo, dispatch) {
  const { person, direction, airport, airline, flightNumber, datetime } = flightInfo;

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
    .then(newFlight => {
      dispatch({ type: 'ADD_FLIGHT', newFlight: newFlight.data.attributes });
    })
    .catch(error => console.error(error));
}

function updateCurrentRide(person, flight, datetime, dispatch) {
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
    .then(updatedRide => {
      dispatch({
        type: 'UPDATE_RIDE',
        modifiedFlightId: flight.id,
        ride: updatedRide.data.attributes
      });
    })
    .catch(error => console.error(error));
}

function createRide(person, flight, datetime, dispatch) {
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
    .then(newRide => {
      dispatch({
        type: 'UPDATE_RIDE',
        modifiedFlightId: flight.id,
        ride: newRide.data.attributes
      });
    })
    .catch(error => console.error(error));
}

export default Modal;