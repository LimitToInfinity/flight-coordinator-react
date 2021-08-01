import React from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';
import Datetime from 'react-datetime';

import '../Stylesheets/AddRide.scss';

function AddRide({ datetime, handleDate, handleSubmit, deleteRide }) {

  const person = useSelector(state => state.person);
  const flight = useSelector(state => state.flight);

  const yesterday = Datetime.moment().subtract(1, 'day');
  const oneYearFromNow = Datetime.moment().add(1, 'year');
  const isValid = current => {
    return current.isAfter(yesterday)
      && current.isBefore(oneYearFromNow);
  };
  const inputProps = { id: 'datetime', name: 'datetime' };

  const verbage = {
    arrival: {
      h2: 'Pick up',
      p: 'arrives',
      label: 'will',
    },
    departure: {
      h2: 'Drop off',
      p: 'departs',
      label: 'should',
    }
  }

  const isDriver = flight.ride && (person.id === flight.ride.driver.id);

  return (
    <>
      <h2>{ verbage[flight.direction].h2 } { flight.traveler.name }
        <img alt={ flight.traveler.name } src={ flight.traveler.image } />
      </h2>
      <p>
        { flight.traveler.name } { verbage[flight.direction].p } { moment(flight.datetime).format('ddd MM/DD/YYYY h:mm a') } at { flight.airport }
      </p>
      <form className='add-ride' onSubmit={ handleSubmit }>
        <label htmlFor='datetime'>
          When { verbage[flight.direction].label } you be at the airport?
        </label>
        <Datetime 
          onChange={ handleDate }
          initialValue={flight.direction === 'arrival'
            ? moment(datetime)
            : moment(datetime).subtract(105, 'minutes')
          }
          isValidDate={ isValid }
          inputProps={ inputProps }
        />
        <div className='form-buttons'>
          {isDriver
            ? <button className='delete-ride' onClick={ deleteRide }>
              Remove ride
            </button>
            : <div></div>
          }
          <input type='submit' value='Submit' />
        </div>
      </form>
    </>
  );
}

export default AddRide;