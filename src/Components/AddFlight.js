import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Datetime from 'react-datetime';
import moment from 'moment';

import '../Stylesheets/AddFlight.scss';

import { urls } from '../utilities/urls';
import { authFetch } from '../utilities/functions';

function AddFlight({ closeModal }) {

  const dispatch = useDispatch();

  const person = useSelector(state => state.person);

  const [datetime, setDatetime] = useState( moment(new Date()) );
  const [direction, setDirection] = useState('');
  const [airport, setAirport] = useState('');
  const [airline, setAirline] = useState('');
  const [flightNumber, setFlightNumber] = useState('');

  const yesterday = Datetime.moment().subtract(1, 'day');
  const oneYearFromNow = Datetime.moment().add(1, 'year');
  const isValid = (current) => {
    return current.isAfter(yesterday)
      && current.isBefore(oneYearFromNow);
  };
  const inputProps = { id: 'datetime', name: 'datetime' };

  const handleSubmit = event => {
    event.preventDefault();

    const flightInfo = {
      person,
      datetime,
      direction,
      airport,
      airline,
      flightNumber
    };
    createFlight(flightInfo, dispatch);

    closeModal();
  }

  return (
    <form onSubmit={ handleSubmit } className='add-ride'>
      <label htmlFor='datetime'>When is your flight?</label>
      <Datetime
        onChange={ date => setDatetime(moment(date._d).format()) }
        initialValue={ moment(datetime) }
        isValidDate={ isValid }
        inputProps={ inputProps }
      />

      <select
        onChange={ event => setDirection(event.target.value) }
        id='direction'
        name='direction' 
      >
        <option value=''>Arrival or Departure?</option>
        <option value='arrival'>Arrival</option>
        <option value='departure'>Departure</option>
      </select>

      <select
        onChange={ event => setAirline(event.target.value) }
        id='airline'
        name='airline' 
      >
        <option value=''>Which airline?</option>
        <option value='American'>American</option>
        <option value='Delta'>Delta</option>
        <option value='Frontier'>Frontier</option>
        <option value='JetBlue'>JetBlue</option>
        <option value='Southwest'>Southwest</option>
        <option value='Spirit'>Spirit</option>
        <option value='United'>United</option>
      </select>

      <select
        onChange={ event => setAirport(event.target.value) }
        id='airport'
        name='airport' 
      >
        <option value=''>Which airport?</option>
        <option value='Bush (IAH)'>Bush (IAH)</option>
        <option value='Hobby (HOU)'>Hobby (HOU)</option>
      </select>

      <label htmlFor='flightNumber'>Flight number?</label>
      <input
        onChange={ event => setFlightNumber(event.target.value) }
        type='text'
        id='flightNumber'
        name='flightNumber' 
        placeholder='enter flight #'
      />

      <div className='form-buttons'>
        <input type='submit' value='Submit' />
      </div>
    </form>
  );
}

function createFlight(flightInfo, dispatch) {
  const {
    person,
    direction,
    airport,
    airline,
    flightNumber,
    datetime
  } = flightInfo;

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

export default AddFlight;