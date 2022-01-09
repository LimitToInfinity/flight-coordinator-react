import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Datetime from 'react-datetime';

import '../Stylesheets/AddFlight.scss';

import Select from './Select';
import InputLabel from './InputLabel';

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

  const yesterday = moment().subtract(1, 'day');
  const oneYearFromNow = moment().add(1, 'year');
  const isValid = currentDate => {
    return currentDate.isAfter(yesterday)
      && currentDate.isBefore(oneYearFromNow);
  };
  const inputProps = { id: 'datetime', name: 'datetime' };

  return (
    <>
      <h2>Enter your flight info</h2>
    
      <form onSubmit={ handleSubmit } className='add-ride'>
        <label htmlFor='datetime'>When is your flight?</label>
        <Datetime
          onChange={ date => setDatetime(moment(date._d).format()) }
          initialValue={ moment(datetime) }
          isValidDate={ isValid }
          inputProps={ inputProps }
        />

        <Select
          name='direction'
          onChange={ event => setDirection(event.target.value) }
          defaultText='Arrival or Departure?'
          optionTexts={ ['arrival', 'departure'] }
        />

        <Select
          name='airline'
          onChange={ event => setAirline(event.target.value) }
          defaultText='Which airline?'
          optionTexts={[
            'American',
            'Delta',
            'Frontier',
            'JetBlue',
            'Southwest',
            'Spirit',
            'United'
          ]}
        />

        <Select
          name='airport'
          onChange={ event => setAirport(event.target.value) }
          defaultText='Which airport?'
          optionTexts={ ['Bush (IAH)', 'Hobby (HOU)'] }
        />

        <InputLabel
          label='Flight number?'
          type='text'
          name='flightNumber'
          placeholder='enter flight #'
          onChange={ event => setFlightNumber(event.target.value) }
        />

        <div className='form-buttons'>
          <div></div>
          <input type='submit' value='Add flight' />
        </div>
      </form>
    </>
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